import Request from '../Request';
import AppCommand from '../AppCommand';
import event from '../Event';
import { CURRENT_VERSION } from '../../constants/Pipeline';
import * as processTypes from '../../constants/ProcessTypes';
import * as errorHandleTypes from '../../constants/ErrorHandleTypes';
import logGroup from '../../helpers/logGroup';
import requestBuffer from '../RequestBuffer';

export const DEFAULT_VERSION = CURRENT_VERSION;
export const DEFAULT_RETRIES = 0;
export const DEFAULT_MAX_RETRIES = 5;
export const DEFAULT_INPUT = {};
export const DEFAULT_TIMEOUT = 20000;
export const DEFAULT_MAX_TIMEOUT = 30000;
export const DEFAULT_PROCESSED = processTypes.PROCESS_ALWAYS;
export const DEFAULT_HANDLE_ERROR = errorHandleTypes.ERROR_HANDLE_DEFAULT;

/**
 * Defines a pipeline request.
 * @class
 */
class PipelineRequest extends Request {
  /**
   * @param {string} name The pipeline name. Excluding the version.
   */
  constructor(name) {
    if (!name) throw new Error('The \'name\' parameter is not set!');
    super();

    this.name = name;
    this.version = DEFAULT_VERSION;
    this.input = DEFAULT_INPUT;
    this.trusted = false;
    this.retries = DEFAULT_RETRIES;
    this.timeout = DEFAULT_TIMEOUT;
    this.process = DEFAULT_PROCESSED;
    this.handleErrors = DEFAULT_HANDLE_ERROR;
  }

  /**
   * @param {number} version The version number of the pipeline request.
   * @return {PipelineRequest}
   */
  setVersion(version = DEFAULT_VERSION) {
    if (typeof version !== 'number') throw new TypeError(`Expected 'number'. Received: '${typeof version}'`);
    if (version < 0) throw new Error(`Expected positive integer. Received: '${version}'`);
    if (version === 0) throw new Error('Has to be > 0!');

    this.version = version;
    return this;
  }

  /**
   * @param {Object} [input={}] The payload to send with the request.
   * @returns {PipelineRequest}
   */
  setInput(input = DEFAULT_INPUT) {
    if ((typeof input !== 'object') || (input.constructor !== Object)) {
      throw new TypeError(`Expected 'object'. Received: '${typeof input}'`);
    }

    this.input = input;
    return this;
  }

  /**
   * @return {PipelineRequest}
   */
  setTrusted() {
    this.trusted = true;
    return this;
  }

  /**
   * @param {number} retries The number of retries this pipeline request should perform.
   * @return {PipelineRequest}
   */
  setRetries(retries = DEFAULT_RETRIES) {
    if (typeof retries !== 'number') throw new TypeError(`Expected 'number'. Received: '${typeof retries}'`);
    if (retries < 0) throw new Error(`Expected positive integer. Received: '${retries}'`);
    if (retries > DEFAULT_MAX_RETRIES) throw new Error(`Maximum is ${DEFAULT_MAX_RETRIES} for retries!`);

    this.retries = retries;
    return this;
  }

  /**
   * @param {number} timeout The timeout (ms) that the request will wait before canceling.
   * @return {PipelineRequest}
   */
  setTimeout(timeout = DEFAULT_TIMEOUT) {
    if (typeof timeout !== 'number') throw new TypeError(`Expected 'number'. Received: '${typeof timeout}'`);
    if (timeout < 0) throw new Error(`Expected positive integer. Received: '${timeout}'`);
    if (timeout > DEFAULT_MAX_TIMEOUT) throw new Error(`Maximum is ${DEFAULT_MAX_TIMEOUT} for timeout!`);

    this.timeout = timeout;
    return this;
  }

  /**
   * @param {string} processed The response process type.
   * @return {PipelineRequest}
   */
  setResponseProcessed(processed = DEFAULT_PROCESSED) {
    if (typeof processed !== 'string') throw new TypeError(`Expected 'string'. Received: '${typeof processed}'`);
    if (!Object.values(processTypes).includes(processed)) {
      throw new Error(`The value '${processed}' is not supported!`);
    }

    this.process = processed;
    return this;
  }

  /**
   * @param {string} handle The handle errors type.
   * @return {PipelineRequest}
   */
  setHandleErrors(handle = errorHandleTypes.ERROR_HANDLE_DEFAULT) {
    if (typeof handle !== 'string') throw new TypeError(`Expected 'string'. Received: '${typeof handle}'`);
    if (!Object.values(errorHandleTypes).includes(handle)) {
      throw new Error(`The value '${handle}' is not supported!`);
    }

    this.handleErrors = handle;
    return this;
  }

  /**
   * @return {PipelineRequest}
   * @deprecated
   */
  setHandledErrors() {
    return this;
  }

  /**
   * @param {Function} resolve Resolves the promise.
   * @param {Function} reject Rejects the promise.
   */
  initRequestCallback(resolve, reject) {
    const requestCallbackName = this.getEventCallbackName();

    /**
     * The request event callback for the response call.
     * @param {Object|null} error The error object if an error happened.
     * @param {string} serial The serial that was used to identify the PipelineRequest callback.
     * @param {Object} output The output of the pipeline.
     */
    this.requestCallback = (error, serial, output) => {
      event.removeCallback(requestCallbackName, this.requestCallback);
      requestBuffer.remove(serial);

      const { input, name, version } = this;

      logGroup(`PipelineResponse %c${name}.v${version}`, {
        input,
        error,
        output,
      }, '#307bc2');

      if (error) {
        // TODO: Has be handled when the ErrorManager is ready.
        reject(error);
        return;
      }

      resolve(output);
    };

    // Apply the event callback.
    event.addCallback(requestCallbackName, this.requestCallback);
  }

  /**
   * @return {Promise}
   */
  dispatch() {
    return new Promise((resolve, reject) => {
      const pipelineName = `${this.name}.v${this.version}`;

      this.createSerial(pipelineName);
      this.createEventCallbackName('pipelineResponse');
      this.initRequestCallback(resolve, reject);
      logGroup(`PipelineRequest %c${pipelineName}`, { input: this.input }, '#32ac5c');

      // Send the pipeline request.
      const command = new AppCommand();
      command.setCommandName('sendPipelineRequest');
      command.setLibVersion('12.0');
      command.dispatch({
        name: pipelineName,
        serial: this.serial,
        input: this.input,
        ...this.trusted && { type: 'trusted' },
      });
    });
  }
}

export default PipelineRequest;

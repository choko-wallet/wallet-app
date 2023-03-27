/* tslint:disable */
/* eslint-disable */
/**
* @param {string} auth_header
* @param {string} payload
* @param {string} client_identity
* @param {string} client_addr
* @param {boolean} enable_log
* @returns {Promise<string>}
*/
export function ext_run_keygen(auth_header: string, payload: string, client_identity: string, client_addr: string, enable_log: boolean): Promise<string>;
/**
* @param {string} auth_header
* @param {string} payload
* @param {string} local_key
* @param {string} client_identity
* @param {string} client_addr
* @param {boolean} enable_log
* @returns {Promise<string>}
*/
export function ext_run_sign(auth_header: string, payload: string, local_key: string, client_identity: string, client_addr: string, enable_log: boolean): Promise<string>;
/**
* @param {string} auth_header
* @param {string} payload
* @param {string} client_identity
* @param {string} client_addr
* @param {boolean} enable_log
* @returns {Promise<string>}
*/
export function ext_run_key_refreh(auth_header: string, payload: string, client_identity: string, client_addr: string, enable_log: boolean): Promise<string>;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly ext_run_keygen: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly ext_run_sign: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
  readonly ext_run_key_refreh: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__he8207c3660c09238: (a: number, b: number, c: number) => void;
  readonly _dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hf665a9151ca393f9: (a: number, b: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__he07b26b847afeaa7: (a: number, b: number, c: number, d: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;

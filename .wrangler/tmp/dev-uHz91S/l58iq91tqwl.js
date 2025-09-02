var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn2 = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn2, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn2) {
    return fn2;
  }
  runInAsyncScope(fn2, thisArg, ...args) {
    return fn2.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir4, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env3) {
    return 1;
  }
  hasColors(count4, env3) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process2 extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process2.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd3) {
    this.#cwd = cwd3;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// .wrangler/tmp/pages-oOe4yN/bundledWorker-0.12641882466871102.mjs
import { Writable as Writable2 } from "node:stream";
import { EventEmitter as EventEmitter2 } from "node:events";
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError2(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError2, "createNotImplementedError");
__name2(createNotImplementedError2, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented2(name) {
  const fn2 = /* @__PURE__ */ __name2(() => {
    throw /* @__PURE__ */ createNotImplementedError2(name);
  }, "fn");
  return Object.assign(fn2, { __unenv__: true });
}
__name(notImplemented2, "notImplemented");
__name2(notImplemented2, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass2(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass2, "notImplementedClass");
__name2(notImplementedClass2, "notImplementedClass");
var _timeOrigin2 = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow2 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin2;
var nodeTiming2 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry2 = class {
  static {
    __name(this, "PerformanceEntry");
  }
  static {
    __name2(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow2();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow2() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark3 = class PerformanceMark22 extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceMark2");
  }
  static {
    __name2(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure2 = class extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceMeasure");
  }
  static {
    __name2(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming2 = class extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  static {
    __name2(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList2 = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  static {
    __name2(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance2 = class {
  static {
    __name(this, "Performance");
  }
  static {
    __name2(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin2;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming2;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming2("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin2) {
      return _performanceNow2();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark3(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure2(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver2 = class {
  static {
    __name(this, "PerformanceObserver");
  }
  static {
    __name2(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.observe");
  }
  bind(fn2) {
    return fn2;
  }
  runInAsyncScope(fn2, thisArg, ...args) {
    return fn2.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance2 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance2();
globalThis.performance = performance2;
globalThis.Performance = Performance2;
globalThis.PerformanceEntry = PerformanceEntry2;
globalThis.PerformanceMark = PerformanceMark3;
globalThis.PerformanceMeasure = PerformanceMeasure2;
globalThis.PerformanceObserver = PerformanceObserver2;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList2;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming2;
var noop_default2 = Object.assign(() => {
}, { __unenv__: true });
var _console2 = globalThis.console;
var _ignoreErrors2 = true;
var _stderr2 = new Writable2();
var _stdout2 = new Writable2();
var log3 = _console2?.log ?? noop_default2;
var info3 = _console2?.info ?? log3;
var trace3 = _console2?.trace ?? info3;
var debug3 = _console2?.debug ?? log3;
var table3 = _console2?.table ?? log3;
var error3 = _console2?.error ?? log3;
var warn3 = _console2?.warn ?? error3;
var createTask3 = _console2?.createTask ?? /* @__PURE__ */ notImplemented2("console.createTask");
var clear3 = _console2?.clear ?? noop_default2;
var count3 = _console2?.count ?? noop_default2;
var countReset3 = _console2?.countReset ?? noop_default2;
var dir3 = _console2?.dir ?? noop_default2;
var dirxml3 = _console2?.dirxml ?? noop_default2;
var group3 = _console2?.group ?? noop_default2;
var groupEnd3 = _console2?.groupEnd ?? noop_default2;
var groupCollapsed3 = _console2?.groupCollapsed ?? noop_default2;
var profile3 = _console2?.profile ?? noop_default2;
var profileEnd3 = _console2?.profileEnd ?? noop_default2;
var time3 = _console2?.time ?? noop_default2;
var timeEnd3 = _console2?.timeEnd ?? noop_default2;
var timeLog3 = _console2?.timeLog ?? noop_default2;
var timeStamp3 = _console2?.timeStamp ?? noop_default2;
var Console2 = _console2?.Console ?? /* @__PURE__ */ notImplementedClass2("console.Console");
var _times2 = /* @__PURE__ */ new Map();
var _stdoutErrorHandler2 = noop_default2;
var _stderrErrorHandler2 = noop_default2;
var workerdConsole2 = globalThis["console"];
var {
  assert: assert3,
  clear: clear22,
  // @ts-expect-error undocumented public API
  context: context2,
  count: count22,
  countReset: countReset22,
  // @ts-expect-error undocumented public API
  createTask: createTask22,
  debug: debug22,
  dir: dir22,
  dirxml: dirxml22,
  error: error22,
  group: group22,
  groupCollapsed: groupCollapsed22,
  groupEnd: groupEnd22,
  info: info22,
  log: log22,
  profile: profile22,
  profileEnd: profileEnd22,
  table: table22,
  time: time22,
  timeEnd: timeEnd22,
  timeLog: timeLog22,
  timeStamp: timeStamp22,
  trace: trace22,
  warn: warn22
} = workerdConsole2;
Object.assign(workerdConsole2, {
  Console: Console2,
  _ignoreErrors: _ignoreErrors2,
  _stderr: _stderr2,
  _stderrErrorHandler: _stderrErrorHandler2,
  _stdout: _stdout2,
  _stdoutErrorHandler: _stdoutErrorHandler2,
  _times: _times2
});
var console_default2 = workerdConsole2;
globalThis.console = console_default2;
var hrtime4 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime22(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint2() {
  return BigInt(Date.now() * 1e6);
}, "bigint"), "bigint") });
var WriteStream2 = class {
  static {
    __name(this, "WriteStream");
  }
  static {
    __name2(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir32, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env22) {
    return 1;
  }
  hasColors(count32, env22) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
var ReadStream2 = class {
  static {
    __name(this, "ReadStream");
  }
  static {
    __name2(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
var NODE_VERSION2 = "22.14.0";
var Process2 = class _Process extends EventEmitter2 {
  static {
    __name(this, "_Process");
  }
  static {
    __name2(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter2.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream2(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream2(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream2(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd22) {
    this.#cwd = cwd22;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION2}`;
  }
  get versions() {
    return { node: NODE_VERSION2 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError2("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError2("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError2("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError2("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError2("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError2("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError2("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError2("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError2("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError2("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError2("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError2("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError2("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError2("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError2("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError2("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError2("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented2("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented2("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented2("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented2("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented2("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented2("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name2(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
var globalProcess2 = globalThis["process"];
var getBuiltinModule2 = globalProcess2.getBuiltinModule;
var { exit: exit2, platform: platform2, nextTick: nextTick2 } = getBuiltinModule2(
  "node:process"
);
var unenvProcess2 = new Process2({
  env: globalProcess2.env,
  hrtime: hrtime4,
  nextTick: nextTick2
});
var {
  abort: abort2,
  addListener: addListener2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
  loadEnvFile: loadEnvFile2,
  sourceMapsEnabled: sourceMapsEnabled2,
  arch: arch2,
  argv: argv2,
  argv0: argv02,
  chdir: chdir2,
  config: config2,
  connected: connected2,
  constrainedMemory: constrainedMemory2,
  availableMemory: availableMemory2,
  cpuUsage: cpuUsage2,
  cwd: cwd2,
  debugPort: debugPort2,
  dlopen: dlopen2,
  disconnect: disconnect2,
  emit: emit2,
  emitWarning: emitWarning2,
  env: env2,
  eventNames: eventNames2,
  execArgv: execArgv2,
  execPath: execPath2,
  finalization: finalization2,
  features: features2,
  getActiveResourcesInfo: getActiveResourcesInfo2,
  getMaxListeners: getMaxListeners2,
  hrtime: hrtime32,
  kill: kill2,
  listeners: listeners2,
  listenerCount: listenerCount2,
  memoryUsage: memoryUsage2,
  on: on2,
  off: off2,
  once: once2,
  pid: pid2,
  ppid: ppid2,
  prependListener: prependListener2,
  prependOnceListener: prependOnceListener2,
  rawListeners: rawListeners2,
  release: release2,
  removeAllListeners: removeAllListeners2,
  removeListener: removeListener2,
  report: report2,
  resourceUsage: resourceUsage2,
  setMaxListeners: setMaxListeners2,
  setSourceMapsEnabled: setSourceMapsEnabled2,
  stderr: stderr2,
  stdin: stdin2,
  stdout: stdout2,
  title: title2,
  throwDeprecation: throwDeprecation2,
  traceDeprecation: traceDeprecation2,
  umask: umask2,
  uptime: uptime2,
  version: version2,
  versions: versions2,
  domain: domain2,
  initgroups: initgroups2,
  moduleLoadList: moduleLoadList2,
  reallyExit: reallyExit2,
  openStdin: openStdin2,
  assert: assert22,
  binding: binding2,
  send: send2,
  exitCode: exitCode2,
  channel: channel2,
  getegid: getegid2,
  geteuid: geteuid2,
  getgid: getgid2,
  getgroups: getgroups2,
  getuid: getuid2,
  setegid: setegid2,
  seteuid: seteuid2,
  setgid: setgid2,
  setgroups: setgroups2,
  setuid: setuid2,
  permission: permission2,
  mainModule: mainModule2,
  _events: _events2,
  _eventsCount: _eventsCount2,
  _exiting: _exiting2,
  _maxListeners: _maxListeners2,
  _debugEnd: _debugEnd2,
  _debugProcess: _debugProcess2,
  _fatalException: _fatalException2,
  _getActiveHandles: _getActiveHandles2,
  _getActiveRequests: _getActiveRequests2,
  _kill: _kill2,
  _preload_modules: _preload_modules2,
  _rawDebug: _rawDebug2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
  _tickCallback: _tickCallback2,
  _disconnect: _disconnect2,
  _handleQueue: _handleQueue2,
  _pendingMessage: _pendingMessage2,
  _channel: _channel2,
  _send: _send2,
  _linkedBinding: _linkedBinding2
} = unenvProcess2;
var _process2 = {
  abort: abort2,
  addListener: addListener2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
  loadEnvFile: loadEnvFile2,
  sourceMapsEnabled: sourceMapsEnabled2,
  arch: arch2,
  argv: argv2,
  argv0: argv02,
  chdir: chdir2,
  config: config2,
  connected: connected2,
  constrainedMemory: constrainedMemory2,
  availableMemory: availableMemory2,
  cpuUsage: cpuUsage2,
  cwd: cwd2,
  debugPort: debugPort2,
  dlopen: dlopen2,
  disconnect: disconnect2,
  emit: emit2,
  emitWarning: emitWarning2,
  env: env2,
  eventNames: eventNames2,
  execArgv: execArgv2,
  execPath: execPath2,
  exit: exit2,
  finalization: finalization2,
  features: features2,
  getBuiltinModule: getBuiltinModule2,
  getActiveResourcesInfo: getActiveResourcesInfo2,
  getMaxListeners: getMaxListeners2,
  hrtime: hrtime32,
  kill: kill2,
  listeners: listeners2,
  listenerCount: listenerCount2,
  memoryUsage: memoryUsage2,
  nextTick: nextTick2,
  on: on2,
  off: off2,
  once: once2,
  pid: pid2,
  platform: platform2,
  ppid: ppid2,
  prependListener: prependListener2,
  prependOnceListener: prependOnceListener2,
  rawListeners: rawListeners2,
  release: release2,
  removeAllListeners: removeAllListeners2,
  removeListener: removeListener2,
  report: report2,
  resourceUsage: resourceUsage2,
  setMaxListeners: setMaxListeners2,
  setSourceMapsEnabled: setSourceMapsEnabled2,
  stderr: stderr2,
  stdin: stdin2,
  stdout: stdout2,
  title: title2,
  throwDeprecation: throwDeprecation2,
  traceDeprecation: traceDeprecation2,
  umask: umask2,
  uptime: uptime2,
  version: version2,
  versions: versions2,
  // @ts-expect-error old API
  domain: domain2,
  initgroups: initgroups2,
  moduleLoadList: moduleLoadList2,
  reallyExit: reallyExit2,
  openStdin: openStdin2,
  assert: assert22,
  binding: binding2,
  send: send2,
  exitCode: exitCode2,
  channel: channel2,
  getegid: getegid2,
  geteuid: geteuid2,
  getgid: getgid2,
  getgroups: getgroups2,
  getuid: getuid2,
  setegid: setegid2,
  seteuid: seteuid2,
  setgid: setgid2,
  setgroups: setgroups2,
  setuid: setuid2,
  permission: permission2,
  mainModule: mainModule2,
  _events: _events2,
  _eventsCount: _eventsCount2,
  _exiting: _exiting2,
  _maxListeners: _maxListeners2,
  _debugEnd: _debugEnd2,
  _debugProcess: _debugProcess2,
  _fatalException: _fatalException2,
  _getActiveHandles: _getActiveHandles2,
  _getActiveRequests: _getActiveRequests2,
  _kill: _kill2,
  _preload_modules: _preload_modules2,
  _rawDebug: _rawDebug2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
  _tickCallback: _tickCallback2,
  _disconnect: _disconnect2,
  _handleQueue: _handleQueue2,
  _pendingMessage: _pendingMessage2,
  _channel: _channel2,
  _send: _send2,
  _linkedBinding: _linkedBinding2
};
var process_default2 = _process2;
globalThis.process = process_default2;
var _r = Object.defineProperty;
var At = /* @__PURE__ */ __name2((e) => {
  throw TypeError(e);
}, "At");
var Fr = /* @__PURE__ */ __name2((e, t, r) => t in e ? _r(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "Fr");
var p = /* @__PURE__ */ __name2((e, t, r) => Fr(e, typeof t != "symbol" ? t + "" : t, r), "p");
var rt = /* @__PURE__ */ __name2((e, t, r) => t.has(e) || At("Cannot " + r), "rt");
var c = /* @__PURE__ */ __name2((e, t, r) => (rt(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "c");
var w = /* @__PURE__ */ __name2((e, t, r) => t.has(e) ? At("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "w");
var y = /* @__PURE__ */ __name2((e, t, r, n) => (rt(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), "y");
var P = /* @__PURE__ */ __name2((e, t, r) => (rt(e, t, "access private method"), r), "P");
var Ot = /* @__PURE__ */ __name2((e, t, r, n) => ({ set _(s) {
  y(e, t, s, r);
}, get _() {
  return c(e, t, n);
} }), "Ot");
var er = { Stringify: 1 };
var M = /* @__PURE__ */ __name2((e, t) => {
  const r = new String(e);
  return r.isEscaped = true, r.callbacks = t, r;
}, "M");
var Br = /[&<>'"]/;
var tr = /* @__PURE__ */ __name2(async (e, t) => {
  let r = "";
  t || (t = []);
  const n = await Promise.all(e);
  for (let s = n.length - 1; r += n[s], s--, !(s < 0); s--) {
    let i = n[s];
    typeof i == "object" && t.push(...i.callbacks || []);
    const a = i.isEscaped;
    if (i = await (typeof i == "object" ? i.toString() : i), typeof i == "object" && t.push(...i.callbacks || []), i.isEscaped ?? a) r += i;
    else {
      const o = [r];
      ee(i, o), r = o[0];
    }
  }
  return M(r, t);
}, "tr");
var ee = /* @__PURE__ */ __name2((e, t) => {
  const r = e.search(Br);
  if (r === -1) {
    t[0] += e;
    return;
  }
  let n, s, i = 0;
  for (s = r; s < e.length; s++) {
    switch (e.charCodeAt(s)) {
      case 34:
        n = "&quot;";
        break;
      case 39:
        n = "&#39;";
        break;
      case 38:
        n = "&amp;";
        break;
      case 60:
        n = "&lt;";
        break;
      case 62:
        n = "&gt;";
        break;
      default:
        continue;
    }
    t[0] += e.substring(i, s) + n, i = s + 1;
  }
  t[0] += e.substring(i, s);
}, "ee");
var rr = /* @__PURE__ */ __name2((e) => {
  const t = e.callbacks;
  if (!(t != null && t.length)) return e;
  const r = [e], n = {};
  return t.forEach((s) => s({ phase: er.Stringify, buffer: r, context: n })), r[0];
}, "rr");
var nr = /* @__PURE__ */ __name2(async (e, t, r, n, s) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const i = e.callbacks;
  return i != null && i.length ? (s ? s[0] += e : s = [e], Promise.all(i.map((o) => o({ phase: t, buffer: s, context: n }))).then((o) => Promise.all(o.filter(Boolean).map((l) => nr(l, t, false, n, s))).then(() => s[0]))) : Promise.resolve(e);
}, "nr");
var Ur = /* @__PURE__ */ __name2((e, ...t) => {
  const r = [""];
  for (let n = 0, s = e.length - 1; n < s; n++) {
    r[0] += e[n];
    const i = Array.isArray(t[n]) ? t[n].flat(1 / 0) : [t[n]];
    for (let a = 0, o = i.length; a < o; a++) {
      const l = i[a];
      if (typeof l == "string") ee(l, r);
      else if (typeof l == "number") r[0] += l;
      else {
        if (typeof l == "boolean" || l === null || l === void 0) continue;
        if (typeof l == "object" && l.isEscaped) if (l.callbacks) r.unshift("", l);
        else {
          const f = l.toString();
          f instanceof Promise ? r.unshift("", f) : r[0] += f;
        }
        else l instanceof Promise ? r.unshift("", l) : ee(l.toString(), r);
      }
    }
  }
  return r[0] += e.at(-1), r.length === 1 ? "callbacks" in r ? M(rr(M(r[0], r.callbacks))) : M(r[0]) : tr(r, r.callbacks);
}, "Ur");
var mt = Symbol("RENDERER");
var ht = Symbol("ERROR_HANDLER");
var O = Symbol("STASH");
var sr = Symbol("INTERNAL");
var qr = Symbol("MEMO");
var Je = Symbol("PERMALINK");
var Ct = /* @__PURE__ */ __name2((e) => (e[sr] = true, e), "Ct");
var ir = /* @__PURE__ */ __name2((e) => ({ value: t, children: r }) => {
  if (!r) return;
  const n = { children: [{ tag: Ct(() => {
    e.push(t);
  }), props: {} }] };
  Array.isArray(r) ? n.children.push(...r.flat()) : n.children.push(r), n.children.push({ tag: Ct(() => {
    e.pop();
  }), props: {} });
  const s = { tag: "", props: n, type: "" };
  return s[ht] = (i) => {
    throw e.pop(), i;
  }, s;
}, "ir");
var ar = /* @__PURE__ */ __name2((e) => {
  const t = [e], r = ir(t);
  return r.values = t, r.Provider = r, we.push(r), r;
}, "ar");
var we = [];
var Et = /* @__PURE__ */ __name2((e) => {
  const t = [e], r = /* @__PURE__ */ __name2((n) => {
    t.push(n.value);
    let s;
    try {
      s = n.children ? (Array.isArray(n.children) ? new fr("", {}, n.children) : n.children).toString() : "";
    } finally {
      t.pop();
    }
    return s instanceof Promise ? s.then((i) => M(i, i.callbacks)) : M(s);
  }, "r");
  return r.values = t, r.Provider = r, r[mt] = ir(t), we.push(r), r;
}, "Et");
var xe = /* @__PURE__ */ __name2((e) => e.values.at(-1), "xe");
var qe = { title: [], script: ["src"], style: ["data-href"], link: ["href"], meta: ["name", "httpEquiv", "charset", "itemProp"] };
var dt = {};
var We = "data-precedence";
var He = /* @__PURE__ */ __name2((e) => Array.isArray(e) ? e : [e], "He");
var kt = /* @__PURE__ */ new WeakMap();
var jt = /* @__PURE__ */ __name2((e, t, r, n) => ({ buffer: s, context: i }) => {
  if (!s) return;
  const a = kt.get(i) || {};
  kt.set(i, a);
  const o = a[e] || (a[e] = []);
  let l = false;
  const f = qe[e];
  if (f.length > 0) {
    e: for (const [, u] of o) for (const h of f) if (((u == null ? void 0 : u[h]) ?? null) === (r == null ? void 0 : r[h])) {
      l = true;
      break e;
    }
  }
  if (l ? s[0] = s[0].replaceAll(t, "") : f.length > 0 ? o.push([t, r, n]) : o.unshift([t, r, n]), s[0].indexOf("</head>") !== -1) {
    let u;
    if (n === void 0) u = o.map(([h]) => h);
    else {
      const h = [];
      u = o.map(([d, , g]) => {
        let m = h.indexOf(g);
        return m === -1 && (h.push(g), m = h.length - 1), [d, m];
      }).sort((d, g) => d[1] - g[1]).map(([d]) => d);
    }
    u.forEach((h) => {
      s[0] = s[0].replaceAll(h, "");
    }), s[0] = s[0].replace(/(?=<\/head>)/, u.join(""));
  }
}, "jt");
var Ie = /* @__PURE__ */ __name2((e, t, r) => M(new _(e, r, He(t ?? [])).toString()), "Ie");
var _e = /* @__PURE__ */ __name2((e, t, r, n) => {
  if ("itemProp" in r) return Ie(e, t, r);
  let { precedence: s, blocking: i, ...a } = r;
  s = n ? s ?? "" : void 0, n && (a[We] = s);
  const o = new _(e, a, He(t || [])).toString();
  return o instanceof Promise ? o.then((l) => M(o, [...l.callbacks || [], jt(e, l, a, s)])) : M(o, [jt(e, o, a, s)]);
}, "_e");
var Wr = /* @__PURE__ */ __name2(({ children: e, ...t }) => {
  const r = wt();
  if (r) {
    const n = xe(r);
    if (n === "svg" || n === "head") return new _("title", t, He(e ?? []));
  }
  return _e("title", e, t, false);
}, "Wr");
var Kr = /* @__PURE__ */ __name2(({ children: e, ...t }) => {
  const r = wt();
  return ["src", "async"].some((n) => !t[n]) || r && xe(r) === "head" ? Ie("script", e, t) : _e("script", e, t, false);
}, "Kr");
var zr = /* @__PURE__ */ __name2(({ children: e, ...t }) => ["href", "precedence"].every((r) => r in t) ? (t["data-href"] = t.href, delete t.href, _e("style", e, t, true)) : Ie("style", e, t), "zr");
var Vr = /* @__PURE__ */ __name2(({ children: e, ...t }) => ["onLoad", "onError"].some((r) => r in t) || t.rel === "stylesheet" && (!("precedence" in t) || "disabled" in t) ? Ie("link", e, t) : _e("link", e, t, "precedence" in t), "Vr");
var Gr = /* @__PURE__ */ __name2(({ children: e, ...t }) => {
  const r = wt();
  return r && xe(r) === "head" ? Ie("meta", e, t) : _e("meta", e, t, false);
}, "Gr");
var or = /* @__PURE__ */ __name2((e, { children: t, ...r }) => new _(e, r, He(t ?? [])), "or");
var Xr = /* @__PURE__ */ __name2((e) => (typeof e.action == "function" && (e.action = Je in e.action ? e.action[Je] : void 0), or("form", e)), "Xr");
var lr = /* @__PURE__ */ __name2((e, t) => (typeof t.formAction == "function" && (t.formAction = Je in t.formAction ? t.formAction[Je] : void 0), or(e, t)), "lr");
var Zr = /* @__PURE__ */ __name2((e) => lr("input", e), "Zr");
var Jr = /* @__PURE__ */ __name2((e) => lr("button", e), "Jr");
var nt = Object.freeze(Object.defineProperty({ __proto__: null, button: Jr, form: Xr, input: Zr, link: Vr, meta: Gr, script: Kr, style: zr, title: Wr }, Symbol.toStringTag, { value: "Module" }));
var Yr = /* @__PURE__ */ new Map([["className", "class"], ["htmlFor", "for"], ["crossOrigin", "crossorigin"], ["httpEquiv", "http-equiv"], ["itemProp", "itemprop"], ["fetchPriority", "fetchpriority"], ["noModule", "nomodule"], ["formAction", "formaction"]]);
var Ye = /* @__PURE__ */ __name2((e) => Yr.get(e) || e, "Ye");
var cr = /* @__PURE__ */ __name2((e, t) => {
  for (const [r, n] of Object.entries(e)) {
    const s = r[0] === "-" || !/[A-Z]/.test(r) ? r : r.replace(/[A-Z]/g, (i) => `-${i.toLowerCase()}`);
    t(s, n == null ? null : typeof n == "number" ? s.match(/^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/) ? `${n}` : `${n}px` : n);
  }
}, "cr");
var Ce = void 0;
var wt = /* @__PURE__ */ __name2(() => Ce, "wt");
var Qr = /* @__PURE__ */ __name2((e) => /[A-Z]/.test(e) && e.match(/^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/) ? e.replace(/([A-Z])/g, "-$1").toLowerCase() : e, "Qr");
var en = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
var tn = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", "download", "formnovalidate", "hidden", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "selected"];
var bt = /* @__PURE__ */ __name2((e, t) => {
  for (let r = 0, n = e.length; r < n; r++) {
    const s = e[r];
    if (typeof s == "string") ee(s, t);
    else {
      if (typeof s == "boolean" || s === null || s === void 0) continue;
      s instanceof _ ? s.toStringToBuffer(t) : typeof s == "number" || s.isEscaped ? t[0] += s : s instanceof Promise ? t.unshift("", s) : bt(s, t);
    }
  }
}, "bt");
var _ = class {
  static {
    __name(this, "_");
  }
  static {
    __name2(this, "_");
  }
  constructor(e, t, r) {
    p(this, "tag");
    p(this, "props");
    p(this, "key");
    p(this, "children");
    p(this, "isEscaped", true);
    p(this, "localContexts");
    this.tag = e, this.props = t, this.children = r;
  }
  get type() {
    return this.tag;
  }
  get ref() {
    return this.props.ref || null;
  }
  toString() {
    var t, r;
    const e = [""];
    (t = this.localContexts) == null || t.forEach(([n, s]) => {
      n.values.push(s);
    });
    try {
      this.toStringToBuffer(e);
    } finally {
      (r = this.localContexts) == null || r.forEach(([n]) => {
        n.values.pop();
      });
    }
    return e.length === 1 ? "callbacks" in e ? rr(M(e[0], e.callbacks)).toString() : e[0] : tr(e, e.callbacks);
  }
  toStringToBuffer(e) {
    const t = this.tag, r = this.props;
    let { children: n } = this;
    e[0] += `<${t}`;
    const s = Ce && xe(Ce) === "svg" ? (i) => Qr(Ye(i)) : (i) => Ye(i);
    for (let [i, a] of Object.entries(r)) if (i = s(i), i !== "children") {
      if (i === "style" && typeof a == "object") {
        let o = "";
        cr(a, (l, f) => {
          f != null && (o += `${o ? ";" : ""}${l}:${f}`);
        }), e[0] += ' style="', ee(o, e), e[0] += '"';
      } else if (typeof a == "string") e[0] += ` ${i}="`, ee(a, e), e[0] += '"';
      else if (a != null) if (typeof a == "number" || a.isEscaped) e[0] += ` ${i}="${a}"`;
      else if (typeof a == "boolean" && tn.includes(i)) a && (e[0] += ` ${i}=""`);
      else if (i === "dangerouslySetInnerHTML") {
        if (n.length > 0) throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        n = [M(a.__html)];
      } else if (a instanceof Promise) e[0] += ` ${i}="`, e.unshift('"', a);
      else if (typeof a == "function") {
        if (!i.startsWith("on") && i !== "ref") throw new Error(`Invalid prop '${i}' of type 'function' supplied to '${t}'.`);
      } else e[0] += ` ${i}="`, ee(a.toString(), e), e[0] += '"';
    }
    if (en.includes(t) && n.length === 0) {
      e[0] += "/>";
      return;
    }
    e[0] += ">", bt(n, e), e[0] += `</${t}>`;
  }
};
var st = class extends _ {
  static {
    __name(this, "st");
  }
  static {
    __name2(this, "st");
  }
  toStringToBuffer(e) {
    const { children: t } = this, r = this.tag.call(null, { ...this.props, children: t.length <= 1 ? t[0] : t });
    if (!(typeof r == "boolean" || r == null)) if (r instanceof Promise) if (we.length === 0) e.unshift("", r);
    else {
      const n = we.map((s) => [s, s.values.at(-1)]);
      e.unshift("", r.then((s) => (s instanceof _ && (s.localContexts = n), s)));
    }
    else r instanceof _ ? r.toStringToBuffer(e) : typeof r == "number" || r.isEscaped ? (e[0] += r, r.callbacks && (e.callbacks || (e.callbacks = []), e.callbacks.push(...r.callbacks))) : ee(r, e);
  }
};
var fr = class extends _ {
  static {
    __name(this, "fr");
  }
  static {
    __name2(this, "fr");
  }
  toStringToBuffer(e) {
    bt(this.children, e);
  }
};
var $t = /* @__PURE__ */ __name2((e, t, ...r) => {
  t ?? (t = {}), r.length && (t.children = r.length === 1 ? r[0] : r);
  const n = t.key;
  delete t.key;
  const s = Ke(e, t, r);
  return s.key = n, s;
}, "$t");
var Tt = false;
var Ke = /* @__PURE__ */ __name2((e, t, r) => {
  if (!Tt) {
    for (const n in dt) nt[n][mt] = dt[n];
    Tt = true;
  }
  return typeof e == "function" ? new st(e, t, r) : nt[e] ? new st(nt[e], t, r) : e === "svg" || e === "head" ? (Ce || (Ce = Et("")), new _(e, t, [new st(Ce, { value: e }, r)])) : new _(e, t, r);
}, "Ke");
var rn = /* @__PURE__ */ __name2(({ children: e }) => new fr("", { children: e }, Array.isArray(e) ? e : e ? [e] : []), "rn");
function S(e, t, r) {
  let n;
  if (!t || !("children" in t)) n = Ke(e, t, []);
  else {
    const s = t.children;
    n = Array.isArray(s) ? Ke(e, t, s) : Ke(e, t, [s]);
  }
  return n.key = r, n;
}
__name(S, "S");
__name2(S, "S");
var Lt = /* @__PURE__ */ __name2((e, t, r) => (n, s) => {
  let i = -1;
  return a(0);
  async function a(o) {
    if (o <= i) throw new Error("next() called multiple times");
    i = o;
    let l, f = false, u;
    if (e[o] ? (u = e[o][0][0], n.req.routeIndex = o) : u = o === e.length && s || void 0, u) try {
      l = await u(n, () => a(o + 1));
    } catch (h) {
      if (h instanceof Error && t) n.error = h, l = await t(h, n), f = true;
      else throw h;
    }
    else n.finalized === false && r && (l = await r(n));
    return l && (n.finalized === false || f) && (n.res = l), n;
  }
  __name(a, "a");
  __name2(a, "a");
}, "Lt");
var nn = Symbol();
var sn = /* @__PURE__ */ __name2(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: n = false } = t, i = (e instanceof gr ? e.raw.headers : e.headers).get("Content-Type");
  return i != null && i.startsWith("multipart/form-data") || i != null && i.startsWith("application/x-www-form-urlencoded") ? an(e, { all: r, dot: n }) : {};
}, "sn");
async function an(e, t) {
  const r = await e.formData();
  return r ? on22(r, t) : {};
}
__name(an, "an");
__name2(an, "an");
function on22(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((n, s) => {
    t.all || s.endsWith("[]") ? ln(r, s, n) : r[s] = n;
  }), t.dot && Object.entries(r).forEach(([n, s]) => {
    n.includes(".") && (cn(r, n, s), delete r[n]);
  }), r;
}
__name(on22, "on2");
__name2(on22, "on");
var ln = /* @__PURE__ */ __name2((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "ln");
var cn = /* @__PURE__ */ __name2((e, t, r) => {
  let n = e;
  const s = t.split(".");
  s.forEach((i, a) => {
    a === s.length - 1 ? n[i] = r : ((!n[i] || typeof n[i] != "object" || Array.isArray(n[i]) || n[i] instanceof File) && (n[i] = /* @__PURE__ */ Object.create(null)), n = n[i]);
  });
}, "cn");
var ur = /* @__PURE__ */ __name2((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "ur");
var fn = /* @__PURE__ */ __name2((e) => {
  const { groups: t, path: r } = un(e), n = ur(r);
  return hn(n, t);
}, "fn");
var un = /* @__PURE__ */ __name2((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, n) => {
    const s = `@${n}`;
    return t.push([s, r]), s;
  }), { groups: t, path: e };
}, "un");
var hn = /* @__PURE__ */ __name2((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [n] = t[r];
    for (let s = e.length - 1; s >= 0; s--) if (e[s].includes(n)) {
      e[s] = e[s].replace(n, t[r][1]);
      break;
    }
  }
  return e;
}, "hn");
var Be = {};
var dn = /* @__PURE__ */ __name2((e, t) => {
  if (e === "*") return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const n = `${e}#${t}`;
    return Be[n] || (r[2] ? Be[n] = t && t[0] !== ":" && t[0] !== "*" ? [n, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : Be[n] = [e, r[1], true]), Be[n];
  }
  return null;
}, "dn");
var Rt = /* @__PURE__ */ __name2((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return t(r);
      } catch {
        return r;
      }
    });
  }
}, "Rt");
var vn = /* @__PURE__ */ __name2((e) => Rt(e, decodeURI), "vn");
var hr = /* @__PURE__ */ __name2((e) => {
  const t = e.url, r = t.indexOf("/", t.charCodeAt(9) === 58 ? 13 : 8);
  let n = r;
  for (; n < t.length; n++) {
    const s = t.charCodeAt(n);
    if (s === 37) {
      const i = t.indexOf("?", n), a = t.slice(r, i === -1 ? void 0 : i);
      return vn(a.includes("%25") ? a.replace(/%25/g, "%2525") : a);
    } else if (s === 63) break;
  }
  return t.slice(r, n);
}, "hr");
var pn = /* @__PURE__ */ __name2((e) => {
  const t = hr(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "pn");
var he = /* @__PURE__ */ __name2((e, t, ...r) => (r.length && (t = he(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "he");
var dr = /* @__PURE__ */ __name2((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":")) return null;
  const t = e.split("/"), r = [];
  let n = "";
  return t.forEach((s) => {
    if (s !== "" && !/\:/.test(s)) n += "/" + s;
    else if (/\:/.test(s)) if (/\?/.test(s)) {
      r.length === 0 && n === "" ? r.push("/") : r.push(n);
      const i = s.replace("?", "");
      n += "/" + i, r.push(n);
    } else n += "/" + s;
  }), r.filter((s, i, a) => a.indexOf(s) === i);
}, "dr");
var it = /* @__PURE__ */ __name2((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? Rt(e, pr) : e) : e, "it");
var vr = /* @__PURE__ */ __name2((e, t, r) => {
  let n;
  if (!r && t && !/[%+]/.test(t)) {
    let a = e.indexOf(`?${t}`, 8);
    for (a === -1 && (a = e.indexOf(`&${t}`, 8)); a !== -1; ) {
      const o = e.charCodeAt(a + t.length + 1);
      if (o === 61) {
        const l = a + t.length + 2, f = e.indexOf("&", l);
        return it(e.slice(l, f === -1 ? void 0 : f));
      } else if (o == 38 || isNaN(o)) return "";
      a = e.indexOf(`&${t}`, a + 1);
    }
    if (n = /[%+]/.test(e), !n) return;
  }
  const s = {};
  n ?? (n = /[%+]/.test(e));
  let i = e.indexOf("?", 8);
  for (; i !== -1; ) {
    const a = e.indexOf("&", i + 1);
    let o = e.indexOf("=", i);
    o > a && a !== -1 && (o = -1);
    let l = e.slice(i + 1, o === -1 ? a === -1 ? void 0 : a : o);
    if (n && (l = it(l)), i = a, l === "") continue;
    let f;
    o === -1 ? f = "" : (f = e.slice(o + 1, a === -1 ? void 0 : a), n && (f = it(f))), r ? (s[l] && Array.isArray(s[l]) || (s[l] = []), s[l].push(f)) : s[l] ?? (s[l] = f);
  }
  return t ? s[t] : s;
}, "vr");
var gn = vr;
var yn = /* @__PURE__ */ __name2((e, t) => vr(e, t, true), "yn");
var pr = decodeURIComponent;
var Nt = /* @__PURE__ */ __name2((e) => Rt(e, pr), "Nt");
var pe;
var N;
var z;
var yr;
var mr;
var vt;
var G;
var Kt;
var gr = (Kt = class {
  static {
    __name(this, "Kt");
  }
  static {
    __name2(this, "Kt");
  }
  constructor(e, t = "/", r = [[]]) {
    w(this, z);
    p(this, "raw");
    w(this, pe);
    w(this, N);
    p(this, "routeIndex", 0);
    p(this, "path");
    p(this, "bodyCache", {});
    w(this, G, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, n = t2[e2];
      if (n) return n;
      const s = Object.keys(t2)[0];
      return s ? t2[s].then((i) => (s === "json" && (i = JSON.stringify(i)), new Response(i)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, y(this, N, r), y(this, pe, {});
  }
  param(e) {
    return e ? P(this, z, yr).call(this, e) : P(this, z, mr).call(this);
  }
  query(e) {
    return gn(this.url, e);
  }
  queries(e) {
    return yn(this.url, e);
  }
  header(e) {
    if (e) return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((r, n) => {
      t[n] = r;
    }), t;
  }
  async parseBody(e) {
    var t;
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await sn(this, e));
  }
  json() {
    return c(this, G).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return c(this, G).call(this, "text");
  }
  arrayBuffer() {
    return c(this, G).call(this, "arrayBuffer");
  }
  blob() {
    return c(this, G).call(this, "blob");
  }
  formData() {
    return c(this, G).call(this, "formData");
  }
  addValidatedData(e, t) {
    c(this, pe)[e] = t;
  }
  valid(e) {
    return c(this, pe)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [nn]() {
    return c(this, N);
  }
  get matchedRoutes() {
    return c(this, N)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return c(this, N)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, pe = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), yr = /* @__PURE__ */ __name2(function(e) {
  const t = c(this, N)[0][this.routeIndex][1][e], r = P(this, z, vt).call(this, t);
  return r ? /\%/.test(r) ? Nt(r) : r : void 0;
}, "yr"), mr = /* @__PURE__ */ __name2(function() {
  const e = {}, t = Object.keys(c(this, N)[0][this.routeIndex][1]);
  for (const r of t) {
    const n = P(this, z, vt).call(this, c(this, N)[0][this.routeIndex][1][r]);
    n && typeof n == "string" && (e[r] = /\%/.test(n) ? Nt(n) : n);
  }
  return e;
}, "mr"), vt = /* @__PURE__ */ __name2(function(e) {
  return c(this, N)[1] ? c(this, N)[1][e] : e;
}, "vt"), G = /* @__PURE__ */ new WeakMap(), Kt);
var mn = "text/plain; charset=UTF-8";
var at = /* @__PURE__ */ __name2((e, t) => ({ "Content-Type": e, ...t }), "at");
var $e;
var Te;
var U;
var ge;
var q;
var L;
var Le;
var ye;
var me;
var se;
var Ne;
var Me;
var X;
var de;
var zt;
var En = (zt = class {
  static {
    __name(this, "zt");
  }
  static {
    __name2(this, "zt");
  }
  constructor(e, t) {
    w(this, X);
    w(this, $e);
    w(this, Te);
    p(this, "env", {});
    w(this, U);
    p(this, "finalized", false);
    p(this, "error");
    w(this, ge);
    w(this, q);
    w(this, L);
    w(this, Le);
    w(this, ye);
    w(this, me);
    w(this, se);
    w(this, Ne);
    w(this, Me);
    p(this, "render", (...e2) => (c(this, ye) ?? y(this, ye, (t2) => this.html(t2)), c(this, ye).call(this, ...e2)));
    p(this, "setLayout", (e2) => y(this, Le, e2));
    p(this, "getLayout", () => c(this, Le));
    p(this, "setRenderer", (e2) => {
      y(this, ye, e2);
    });
    p(this, "header", (e2, t2, r) => {
      this.finalized && y(this, L, new Response(c(this, L).body, c(this, L)));
      const n = c(this, L) ? c(this, L).headers : c(this, se) ?? y(this, se, new Headers());
      t2 === void 0 ? n.delete(e2) : r != null && r.append ? n.append(e2, t2) : n.set(e2, t2);
    });
    p(this, "status", (e2) => {
      y(this, ge, e2);
    });
    p(this, "set", (e2, t2) => {
      c(this, U) ?? y(this, U, /* @__PURE__ */ new Map()), c(this, U).set(e2, t2);
    });
    p(this, "get", (e2) => c(this, U) ? c(this, U).get(e2) : void 0);
    p(this, "newResponse", (...e2) => P(this, X, de).call(this, ...e2));
    p(this, "body", (e2, t2, r) => P(this, X, de).call(this, e2, t2, r));
    p(this, "text", (e2, t2, r) => !c(this, se) && !c(this, ge) && !t2 && !r && !this.finalized ? new Response(e2) : P(this, X, de).call(this, e2, t2, at(mn, r)));
    p(this, "json", (e2, t2, r) => P(this, X, de).call(this, JSON.stringify(e2), t2, at("application/json", r)));
    p(this, "html", (e2, t2, r) => {
      const n = /* @__PURE__ */ __name2((s) => P(this, X, de).call(this, s, t2, at("text/html; charset=UTF-8", r)), "n");
      return typeof e2 == "object" ? nr(e2, er.Stringify, false, {}).then(n) : n(e2);
    });
    p(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    p(this, "notFound", () => (c(this, me) ?? y(this, me, () => new Response()), c(this, me).call(this, this)));
    y(this, $e, e), t && (y(this, q, t.executionCtx), this.env = t.env, y(this, me, t.notFoundHandler), y(this, Me, t.path), y(this, Ne, t.matchResult));
  }
  get req() {
    return c(this, Te) ?? y(this, Te, new gr(c(this, $e), c(this, Me), c(this, Ne))), c(this, Te);
  }
  get event() {
    if (c(this, q) && "respondWith" in c(this, q)) return c(this, q);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (c(this, q)) return c(this, q);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return c(this, L) || y(this, L, new Response(null, { headers: c(this, se) ?? y(this, se, new Headers()) }));
  }
  set res(e) {
    if (c(this, L) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of c(this, L).headers.entries()) if (t !== "content-type") if (t === "set-cookie") {
        const n = c(this, L).headers.getSetCookie();
        e.headers.delete("set-cookie");
        for (const s of n) e.headers.append("set-cookie", s);
      } else e.headers.set(t, r);
    }
    y(this, L, e), this.finalized = true;
  }
  get var() {
    return c(this, U) ? Object.fromEntries(c(this, U)) : {};
  }
}, $e = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), ge = /* @__PURE__ */ new WeakMap(), q = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), se = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakSet(), de = /* @__PURE__ */ __name2(function(e, t, r) {
  const n = c(this, L) ? new Headers(c(this, L).headers) : c(this, se) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const i = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [a, o] of i) a.toLowerCase() === "set-cookie" ? n.append(a, o) : n.set(a, o);
  }
  if (r) for (const [i, a] of Object.entries(r)) if (typeof a == "string") n.set(i, a);
  else {
    n.delete(i);
    for (const o of a) n.append(i, o);
  }
  const s = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? c(this, ge);
  return new Response(e, { status: s, headers: n });
}, "de"), zt);
var C = "ALL";
var wn = "all";
var bn = ["get", "post", "put", "delete", "options", "patch"];
var Er = "Can not add a route since the matcher is already built.";
var wr = class extends Error {
  static {
    __name(this, "wr");
  }
  static {
    __name2(this, "wr");
  }
};
var Rn = "__COMPOSED_HANDLER";
var xn = /* @__PURE__ */ __name2((e) => e.text("404 Not Found", 404), "xn");
var Mt = /* @__PURE__ */ __name2((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Mt");
var D;
var k;
var Rr;
var H;
var re;
var ze;
var Ve;
var Vt;
var br = (Vt = class {
  static {
    __name(this, "Vt");
  }
  static {
    __name2(this, "Vt");
  }
  constructor(t = {}) {
    w(this, k);
    p(this, "get");
    p(this, "post");
    p(this, "put");
    p(this, "delete");
    p(this, "options");
    p(this, "patch");
    p(this, "all");
    p(this, "on");
    p(this, "use");
    p(this, "router");
    p(this, "getPath");
    p(this, "_basePath", "/");
    w(this, D, "/");
    p(this, "routes", []);
    w(this, H, xn);
    p(this, "errorHandler", Mt);
    p(this, "onError", (t2) => (this.errorHandler = t2, this));
    p(this, "notFound", (t2) => (y(this, H, t2), this));
    p(this, "fetch", (t2, ...r) => P(this, k, Ve).call(this, t2, r[1], r[0], t2.method));
    p(this, "request", (t2, r, n2, s2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, n2, s2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${he("/", t2)}`, r), n2, s2)));
    p(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(P(this, k, Ve).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...bn, wn].forEach((i) => {
      this[i] = (a, ...o) => (typeof a == "string" ? y(this, D, a) : P(this, k, re).call(this, i, c(this, D), a), o.forEach((l) => {
        P(this, k, re).call(this, i, c(this, D), l);
      }), this);
    }), this.on = (i, a, ...o) => {
      for (const l of [a].flat()) {
        y(this, D, l);
        for (const f of [i].flat()) o.map((u) => {
          P(this, k, re).call(this, f.toUpperCase(), c(this, D), u);
        });
      }
      return this;
    }, this.use = (i, ...a) => (typeof i == "string" ? y(this, D, i) : (y(this, D, "*"), a.unshift(i)), a.forEach((o) => {
      P(this, k, re).call(this, C, c(this, D), o);
    }), this);
    const { strict: n, ...s } = t;
    Object.assign(this, s), this.getPath = n ?? true ? t.getPath ?? hr : pn;
  }
  route(t, r) {
    const n = this.basePath(t);
    return r.routes.map((s) => {
      var a;
      let i;
      r.errorHandler === Mt ? i = s.handler : (i = /* @__PURE__ */ __name2(async (o, l) => (await Lt([], r.errorHandler)(o, () => s.handler(o, l))).res, "i"), i[Rn] = s.handler), P(a = n, k, re).call(a, s.method, s.path, i);
    }), this;
  }
  basePath(t) {
    const r = P(this, k, Rr).call(this);
    return r._basePath = he(this._basePath, t), r;
  }
  mount(t, r, n) {
    let s, i;
    n && (typeof n == "function" ? i = n : (i = n.optionHandler, n.replaceRequest === false ? s = /* @__PURE__ */ __name2((l) => l, "s") : s = n.replaceRequest));
    const a = i ? (l) => {
      const f = i(l);
      return Array.isArray(f) ? f : [f];
    } : (l) => {
      let f;
      try {
        f = l.executionCtx;
      } catch {
      }
      return [l.env, f];
    };
    s || (s = (() => {
      const l = he(this._basePath, t), f = l === "/" ? 0 : l.length;
      return (u) => {
        const h = new URL(u.url);
        return h.pathname = h.pathname.slice(f) || "/", new Request(h, u);
      };
    })());
    const o = /* @__PURE__ */ __name2(async (l, f) => {
      const u = await r(s(l.req.raw), ...a(l));
      if (u) return u;
      await f();
    }, "o");
    return P(this, k, re).call(this, C, he(t, "*"), o), this;
  }
}, D = /* @__PURE__ */ new WeakMap(), k = /* @__PURE__ */ new WeakSet(), Rr = /* @__PURE__ */ __name2(function() {
  const t = new br({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, y(t, H, c(this, H)), t.routes = this.routes, t;
}, "Rr"), H = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ __name2(function(t, r, n) {
  t = t.toUpperCase(), r = he(this._basePath, r);
  const s = { basePath: this._basePath, path: r, method: t, handler: n };
  this.router.add(t, r, [n, s]), this.routes.push(s);
}, "re"), ze = /* @__PURE__ */ __name2(function(t, r) {
  if (t instanceof Error) return this.errorHandler(t, r);
  throw t;
}, "ze"), Ve = /* @__PURE__ */ __name2(function(t, r, n, s) {
  if (s === "HEAD") return (async () => new Response(null, await P(this, k, Ve).call(this, t, r, n, "GET")))();
  const i = this.getPath(t, { env: n }), a = this.router.match(s, i), o = new En(t, { path: i, matchResult: a, env: n, executionCtx: r, notFoundHandler: c(this, H) });
  if (a[0].length === 1) {
    let f;
    try {
      f = a[0][0][0][0](o, async () => {
        o.res = await c(this, H).call(this, o);
      });
    } catch (u) {
      return P(this, k, ze).call(this, u, o);
    }
    return f instanceof Promise ? f.then((u) => u || (o.finalized ? o.res : c(this, H).call(this, o))).catch((u) => P(this, k, ze).call(this, u, o)) : f ?? c(this, H).call(this, o);
  }
  const l = Lt(a[0], this.errorHandler, c(this, H));
  return (async () => {
    try {
      const f = await l(o);
      if (!f.finalized) throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return f.res;
    } catch (f) {
      return P(this, k, ze).call(this, f, o);
    }
  })();
}, "Ve"), Vt);
var Qe = "[^/]+";
var Ae = ".*";
var Oe = "(?:|/.*)";
var ve = Symbol();
var Sn = new Set(".\\+*[^]$()");
function Pn(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === Ae || e === Oe ? 1 : t === Ae || t === Oe ? -1 : e === Qe ? 1 : t === Qe ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(Pn, "Pn");
__name2(Pn, "Pn");
var ie;
var ae;
var I;
var Gt;
var pt = (Gt = class {
  static {
    __name(this, "Gt");
  }
  static {
    __name2(this, "Gt");
  }
  constructor() {
    w(this, ie);
    w(this, ae);
    w(this, I, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, n, s, i) {
    if (t.length === 0) {
      if (c(this, ie) !== void 0) throw ve;
      if (i) return;
      y(this, ie, r);
      return;
    }
    const [a, ...o] = t, l = a === "*" ? o.length === 0 ? ["", "", Ae] : ["", "", Qe] : a === "/*" ? ["", "", Oe] : a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let f;
    if (l) {
      const u = l[1];
      let h = l[2] || Qe;
      if (u && l[2] && (h === ".*" || (h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(h)))) throw ve;
      if (f = c(this, I)[h], !f) {
        if (Object.keys(c(this, I)).some((d) => d !== Ae && d !== Oe)) throw ve;
        if (i) return;
        f = c(this, I)[h] = new pt(), u !== "" && y(f, ae, s.varIndex++);
      }
      !i && u !== "" && n.push([u, c(f, ae)]);
    } else if (f = c(this, I)[a], !f) {
      if (Object.keys(c(this, I)).some((u) => u.length > 1 && u !== Ae && u !== Oe)) throw ve;
      if (i) return;
      f = c(this, I)[a] = new pt();
    }
    f.insert(o, r, n, s, i);
  }
  buildRegExpStr() {
    const r = Object.keys(c(this, I)).sort(Pn).map((n) => {
      const s = c(this, I)[n];
      return (typeof c(s, ae) == "number" ? `(${n})@${c(s, ae)}` : Sn.has(n) ? `\\${n}` : n) + s.buildRegExpStr();
    });
    return typeof c(this, ie) == "number" && r.unshift(`#${c(this, ie)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, ie = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), Gt);
var et;
var De;
var Xt;
var An = (Xt = class {
  static {
    __name(this, "Xt");
  }
  static {
    __name2(this, "Xt");
  }
  constructor() {
    w(this, et, { varIndex: 0 });
    w(this, De, new pt());
  }
  insert(e, t, r) {
    const n = [], s = [];
    for (let a = 0; ; ) {
      let o = false;
      if (e = e.replace(/\{[^}]+\}/g, (l) => {
        const f = `@\\${a}`;
        return s[a] = [f, l], a++, o = true, f;
      }), !o) break;
    }
    const i = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let a = s.length - 1; a >= 0; a--) {
      const [o] = s[a];
      for (let l = i.length - 1; l >= 0; l--) if (i[l].indexOf(o) !== -1) {
        i[l] = i[l].replace(o, s[a][1]);
        break;
      }
    }
    return c(this, De).insert(i, t, n, c(this, et), r), n;
  }
  buildRegExp() {
    let e = c(this, De).buildRegExpStr();
    if (e === "") return [/^$/, [], []];
    let t = 0;
    const r = [], n = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (s, i, a) => i !== void 0 ? (r[++t] = Number(i), "$()") : (a !== void 0 && (n[Number(a)] = ++t), "")), [new RegExp(`^${e}`), r, n];
  }
}, et = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), Xt);
var xr = [];
var On = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Ge = /* @__PURE__ */ Object.create(null);
function Sr(e) {
  return Ge[e] ?? (Ge[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(Sr, "Sr");
__name2(Sr, "Sr");
function Cn() {
  Ge = /* @__PURE__ */ Object.create(null);
}
__name(Cn, "Cn");
__name2(Cn, "Cn");
function kn(e) {
  var f;
  const t = new An(), r = [];
  if (e.length === 0) return On;
  const n = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, h], [d, g]) => u ? 1 : d ? -1 : h.length - g.length), s = /* @__PURE__ */ Object.create(null);
  for (let u = 0, h = -1, d = n.length; u < d; u++) {
    const [g, m, v] = n[u];
    g ? s[m] = [v.map(([b]) => [b, /* @__PURE__ */ Object.create(null)]), xr] : h++;
    let E;
    try {
      E = t.insert(m, h, g);
    } catch (b) {
      throw b === ve ? new wr(m) : b;
    }
    g || (r[h] = v.map(([b, R]) => {
      const A = /* @__PURE__ */ Object.create(null);
      for (R -= 1; R >= 0; R--) {
        const [x, $] = E[R];
        A[x] = $;
      }
      return [b, A];
    }));
  }
  const [i, a, o] = t.buildRegExp();
  for (let u = 0, h = r.length; u < h; u++) for (let d = 0, g = r[u].length; d < g; d++) {
    const m = (f = r[u][d]) == null ? void 0 : f[1];
    if (!m) continue;
    const v = Object.keys(m);
    for (let E = 0, b = v.length; E < b; E++) m[v[E]] = o[m[v[E]]];
  }
  const l = [];
  for (const u in a) l[u] = r[a[u]];
  return [i, l, s];
}
__name(kn, "kn");
__name2(kn, "kn");
function fe(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((n, s) => s.length - n.length)) if (Sr(r).test(t)) return [...e[r]];
  }
}
__name(fe, "fe");
__name2(fe, "fe");
var Z;
var J;
var Re;
var Pr;
var Ar;
var Zt;
var jn = (Zt = class {
  static {
    __name(this, "Zt");
  }
  static {
    __name2(this, "Zt");
  }
  constructor() {
    w(this, Re);
    p(this, "name", "RegExpRouter");
    w(this, Z);
    w(this, J);
    y(this, Z, { [C]: /* @__PURE__ */ Object.create(null) }), y(this, J, { [C]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var o;
    const n = c(this, Z), s = c(this, J);
    if (!n || !s) throw new Error(Er);
    n[e] || [n, s].forEach((l) => {
      l[e] = /* @__PURE__ */ Object.create(null), Object.keys(l[C]).forEach((f) => {
        l[e][f] = [...l[C][f]];
      });
    }), t === "/*" && (t = "*");
    const i = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const l = Sr(t);
      e === C ? Object.keys(n).forEach((f) => {
        var u;
        (u = n[f])[t] || (u[t] = fe(n[f], t) || fe(n[C], t) || []);
      }) : (o = n[e])[t] || (o[t] = fe(n[e], t) || fe(n[C], t) || []), Object.keys(n).forEach((f) => {
        (e === C || e === f) && Object.keys(n[f]).forEach((u) => {
          l.test(u) && n[f][u].push([r, i]);
        });
      }), Object.keys(s).forEach((f) => {
        (e === C || e === f) && Object.keys(s[f]).forEach((u) => l.test(u) && s[f][u].push([r, i]));
      });
      return;
    }
    const a = dr(t) || [t];
    for (let l = 0, f = a.length; l < f; l++) {
      const u = a[l];
      Object.keys(s).forEach((h) => {
        var d;
        (e === C || e === h) && ((d = s[h])[u] || (d[u] = [...fe(n[h], u) || fe(n[C], u) || []]), s[h][u].push([r, i - f + l + 1]));
      });
    }
  }
  match(e, t) {
    Cn();
    const r = P(this, Re, Pr).call(this);
    return this.match = (n, s) => {
      const i = r[n] || r[C], a = i[2][s];
      if (a) return a;
      const o = s.match(i[0]);
      if (!o) return [[], xr];
      const l = o.indexOf("", 1);
      return [i[1][l], o];
    }, this.match(e, t);
  }
}, Z = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakSet(), Pr = /* @__PURE__ */ __name2(function() {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.keys(c(this, J)).concat(Object.keys(c(this, Z))).forEach((t) => {
    e[t] || (e[t] = P(this, Re, Ar).call(this, t));
  }), y(this, Z, y(this, J, void 0)), e;
}, "Pr"), Ar = /* @__PURE__ */ __name2(function(e) {
  const t = [];
  let r = e === C;
  return [c(this, Z), c(this, J)].forEach((n) => {
    const s = n[e] ? Object.keys(n[e]).map((i) => [i, n[e][i]]) : [];
    s.length !== 0 ? (r || (r = true), t.push(...s)) : e !== C && t.push(...Object.keys(n[C]).map((i) => [i, n[C][i]]));
  }), r ? kn(t) : null;
}, "Ar"), Zt);
var Y;
var W;
var Jt;
var $n = (Jt = class {
  static {
    __name(this, "Jt");
  }
  static {
    __name2(this, "Jt");
  }
  constructor(e) {
    p(this, "name", "SmartRouter");
    w(this, Y, []);
    w(this, W, []);
    y(this, Y, e.routers);
  }
  add(e, t, r) {
    if (!c(this, W)) throw new Error(Er);
    c(this, W).push([e, t, r]);
  }
  match(e, t) {
    if (!c(this, W)) throw new Error("Fatal error");
    const r = c(this, Y), n = c(this, W), s = r.length;
    let i = 0, a;
    for (; i < s; i++) {
      const o = r[i];
      try {
        for (let l = 0, f = n.length; l < f; l++) o.add(...n[l]);
        a = o.match(e, t);
      } catch (l) {
        if (l instanceof wr) continue;
        throw l;
      }
      this.match = o.match.bind(o), y(this, Y, [o]), y(this, W, void 0);
      break;
    }
    if (i === s) throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, a;
  }
  get activeRouter() {
    if (c(this, W) || c(this, Y).length !== 1) throw new Error("No active router has been determined yet.");
    return c(this, Y)[0];
  }
}, Y = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ new WeakMap(), Jt);
var Se = /* @__PURE__ */ Object.create(null);
var Q;
var T;
var oe;
var Ee;
var j;
var K;
var ne;
var Yt;
var Or = (Yt = class {
  static {
    __name(this, "Yt");
  }
  static {
    __name2(this, "Yt");
  }
  constructor(e, t, r) {
    w(this, K);
    w(this, Q);
    w(this, T);
    w(this, oe);
    w(this, Ee, 0);
    w(this, j, Se);
    if (y(this, T, r || /* @__PURE__ */ Object.create(null)), y(this, Q, []), e && t) {
      const n = /* @__PURE__ */ Object.create(null);
      n[e] = { handler: t, possibleKeys: [], score: 0 }, y(this, Q, [n]);
    }
    y(this, oe, []);
  }
  insert(e, t, r) {
    y(this, Ee, ++Ot(this, Ee)._);
    let n = this;
    const s = fn(t), i = [];
    for (let a = 0, o = s.length; a < o; a++) {
      const l = s[a], f = s[a + 1], u = dn(l, f), h = Array.isArray(u) ? u[0] : l;
      if (h in c(n, T)) {
        n = c(n, T)[h], u && i.push(u[1]);
        continue;
      }
      c(n, T)[h] = new Or(), u && (c(n, oe).push(u), i.push(u[1])), n = c(n, T)[h];
    }
    return c(n, Q).push({ [e]: { handler: r, possibleKeys: i.filter((a, o, l) => l.indexOf(a) === o), score: c(this, Ee) } }), n;
  }
  search(e, t) {
    var o;
    const r = [];
    y(this, j, Se);
    let s = [this];
    const i = ur(t), a = [];
    for (let l = 0, f = i.length; l < f; l++) {
      const u = i[l], h = l === f - 1, d = [];
      for (let g = 0, m = s.length; g < m; g++) {
        const v = s[g], E = c(v, T)[u];
        E && (y(E, j, c(v, j)), h ? (c(E, T)["*"] && r.push(...P(this, K, ne).call(this, c(E, T)["*"], e, c(v, j))), r.push(...P(this, K, ne).call(this, E, e, c(v, j)))) : d.push(E));
        for (let b = 0, R = c(v, oe).length; b < R; b++) {
          const A = c(v, oe)[b], x = c(v, j) === Se ? {} : { ...c(v, j) };
          if (A === "*") {
            const V = c(v, T)["*"];
            V && (r.push(...P(this, K, ne).call(this, V, e, c(v, j))), y(V, j, x), d.push(V));
            continue;
          }
          const [$, ce, te] = A;
          if (!u && !(te instanceof RegExp)) continue;
          const F = c(v, T)[$], Ir = i.slice(l).join("/");
          if (te instanceof RegExp) {
            const V = te.exec(Ir);
            if (V) {
              if (x[ce] = V[0], r.push(...P(this, K, ne).call(this, F, e, c(v, j), x)), Object.keys(c(F, T)).length) {
                y(F, j, x);
                const tt = ((o = V[0].match(/\//)) == null ? void 0 : o.length) ?? 0;
                (a[tt] || (a[tt] = [])).push(F);
              }
              continue;
            }
          }
          (te === true || te.test(u)) && (x[ce] = u, h ? (r.push(...P(this, K, ne).call(this, F, e, x, c(v, j))), c(F, T)["*"] && r.push(...P(this, K, ne).call(this, c(F, T)["*"], e, x, c(v, j)))) : (y(F, j, x), d.push(F)));
        }
      }
      s = d.concat(a.shift() ?? []);
    }
    return r.length > 1 && r.sort((l, f) => l.score - f.score), [r.map(({ handler: l, params: f }) => [l, f])];
  }
}, Q = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakSet(), ne = /* @__PURE__ */ __name2(function(e, t, r, n) {
  const s = [];
  for (let i = 0, a = c(e, Q).length; i < a; i++) {
    const o = c(e, Q)[i], l = o[t] || o[C], f = {};
    if (l !== void 0 && (l.params = /* @__PURE__ */ Object.create(null), s.push(l), r !== Se || n && n !== Se)) for (let u = 0, h = l.possibleKeys.length; u < h; u++) {
      const d = l.possibleKeys[u], g = f[l.score];
      l.params[d] = n != null && n[d] && !g ? n[d] : r[d] ?? (n == null ? void 0 : n[d]), f[l.score] = true;
    }
  }
  return s;
}, "ne"), Yt);
var le;
var Qt;
var Tn = (Qt = class {
  static {
    __name(this, "Qt");
  }
  static {
    __name2(this, "Qt");
  }
  constructor() {
    p(this, "name", "TrieRouter");
    w(this, le);
    y(this, le, new Or());
  }
  add(e, t, r) {
    const n = dr(t);
    if (n) {
      for (let s = 0, i = n.length; s < i; s++) c(this, le).insert(e, n[s], r);
      return;
    }
    c(this, le).insert(e, t, r);
  }
  match(e, t) {
    return c(this, le).search(e, t);
  }
}, le = /* @__PURE__ */ new WeakMap(), Qt);
var Cr = class extends br {
  static {
    __name(this, "Cr");
  }
  static {
    __name2(this, "Cr");
  }
  constructor(e = {}) {
    super(e), this.router = e.router ?? new $n({ routers: [new jn(), new Tn()] });
  }
};
var ke = "_hp";
var Ln = { Change: "Input", DoubleClick: "DblClick" };
var Nn = { svg: "2000/svg", math: "1998/Math/MathML" };
var je = [];
var gt = /* @__PURE__ */ new WeakMap();
var be = void 0;
var Mn = /* @__PURE__ */ __name2(() => be, "Mn");
var B = /* @__PURE__ */ __name2((e) => "t" in e, "B");
var ot = { onClick: ["click", false] };
var Dt = /* @__PURE__ */ __name2((e) => {
  if (!e.startsWith("on")) return;
  if (ot[e]) return ot[e];
  const t = e.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);
  if (t) {
    const [, r, n] = t;
    return ot[e] = [(Ln[r] || r).toLowerCase(), !!n];
  }
}, "Dt");
var Ht = /* @__PURE__ */ __name2((e, t) => be && e instanceof SVGElement && /[A-Z]/.test(t) && (t in e.style || t.match(/^(?:o|pai|str|u|ve)/)) ? t.replace(/([A-Z])/g, "-$1").toLowerCase() : t, "Ht");
var Dn = /* @__PURE__ */ __name2((e, t, r) => {
  var n;
  t || (t = {});
  for (let s in t) {
    const i = t[s];
    if (s !== "children" && (!r || r[s] !== i)) {
      s = Ye(s);
      const a = Dt(s);
      if (a) {
        if ((r == null ? void 0 : r[s]) !== i && (r && e.removeEventListener(a[0], r[s], a[1]), i != null)) {
          if (typeof i != "function") throw new Error(`Event handler for "${s}" is not a function`);
          e.addEventListener(a[0], i, a[1]);
        }
      } else if (s === "dangerouslySetInnerHTML" && i) e.innerHTML = i.__html;
      else if (s === "ref") {
        let o;
        typeof i == "function" ? o = i(e) || (() => i(null)) : i && "current" in i && (i.current = e, o = /* @__PURE__ */ __name2(() => i.current = null, "o")), gt.set(e, o);
      } else if (s === "style") {
        const o = e.style;
        typeof i == "string" ? o.cssText = i : (o.cssText = "", i != null && cr(i, o.setProperty.bind(o)));
      } else {
        if (s === "value") {
          const l = e.nodeName;
          if (l === "INPUT" || l === "TEXTAREA" || l === "SELECT") {
            if (e.value = i == null || i === false ? null : i, l === "TEXTAREA") {
              e.textContent = i;
              continue;
            } else if (l === "SELECT") {
              e.selectedIndex === -1 && (e.selectedIndex = 0);
              continue;
            }
          }
        } else (s === "checked" && e.nodeName === "INPUT" || s === "selected" && e.nodeName === "OPTION") && (e[s] = i);
        const o = Ht(e, s);
        i == null || i === false ? e.removeAttribute(o) : i === true ? e.setAttribute(o, "") : typeof i == "string" || typeof i == "number" ? e.setAttribute(o, i) : e.setAttribute(o, i.toString());
      }
    }
  }
  if (r) for (let s in r) {
    const i = r[s];
    if (s !== "children" && !(s in t)) {
      s = Ye(s);
      const a = Dt(s);
      a ? e.removeEventListener(a[0], i, a[1]) : s === "ref" ? (n = gt.get(e)) == null || n() : e.removeAttribute(Ht(e, s));
    }
  }
}, "Dn");
var Hn = /* @__PURE__ */ __name2((e, t) => {
  t[O][0] = 0, je.push([e, t]);
  const r = t.tag[mt] || t.tag, n = r.defaultProps ? { ...r.defaultProps, ...t.props } : t.props;
  try {
    return [r.call(null, n)];
  } finally {
    je.pop();
  }
}, "Hn");
var kr = /* @__PURE__ */ __name2((e, t, r, n, s) => {
  var i, a;
  (i = e.vR) != null && i.length && (n.push(...e.vR), delete e.vR), typeof e.tag == "function" && ((a = e[O][1][Lr]) == null || a.forEach((o) => s.push(o))), e.vC.forEach((o) => {
    var l;
    if (B(o)) r.push(o);
    else if (typeof o.tag == "function" || o.tag === "") {
      o.c = t;
      const f = r.length;
      if (kr(o, t, r, n, s), o.s) {
        for (let u = f; u < r.length; u++) r[u].s = true;
        o.s = false;
      }
    } else r.push(o), (l = o.vR) != null && l.length && (n.push(...o.vR), delete o.vR);
  });
}, "kr");
var In = /* @__PURE__ */ __name2((e) => {
  for (; ; e = e.tag === ke || !e.vC || !e.pP ? e.nN : e.vC[0]) {
    if (!e) return null;
    if (e.tag !== ke && e.e) return e.e;
  }
}, "In");
var jr = /* @__PURE__ */ __name2((e) => {
  var t, r, n, s, i, a;
  B(e) || ((r = (t = e[O]) == null ? void 0 : t[1][Lr]) == null || r.forEach((o) => {
    var l;
    return (l = o[2]) == null ? void 0 : l.call(o);
  }), (n = gt.get(e.e)) == null || n(), e.p === 2 && ((s = e.vC) == null || s.forEach((o) => o.p = 2)), (i = e.vC) == null || i.forEach(jr)), e.p || ((a = e.e) == null || a.remove(), delete e.e), typeof e.tag == "function" && (Pe.delete(e), Xe.delete(e), delete e[O][3], e.a = true);
}, "jr");
var $r = /* @__PURE__ */ __name2((e, t, r) => {
  e.c = t, Tr(e, t, r);
}, "$r");
var It = /* @__PURE__ */ __name2((e, t) => {
  if (t) {
    for (let r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
  }
}, "It");
var _t = Symbol();
var Tr = /* @__PURE__ */ __name2((e, t, r) => {
  var f;
  const n = [], s = [], i = [];
  kr(e, t, n, s, i), s.forEach(jr);
  const a = r ? void 0 : t.childNodes;
  let o, l = null;
  if (r) o = -1;
  else if (!a.length) o = 0;
  else {
    const u = It(a, In(e.nN));
    u !== void 0 ? (l = a[u], o = u) : o = It(a, (f = n.find((h) => h.tag !== ke && h.e)) == null ? void 0 : f.e) ?? -1, o === -1 && (r = true);
  }
  for (let u = 0, h = n.length; u < h; u++, o++) {
    const d = n[u];
    let g;
    if (d.s && d.e) g = d.e, d.s = false;
    else {
      const m = r || !d.e;
      B(d) ? (d.e && d.d && (d.e.textContent = d.t), d.d = false, g = d.e || (d.e = document.createTextNode(d.t))) : (g = d.e || (d.e = d.n ? document.createElementNS(d.n, d.tag) : document.createElement(d.tag)), Dn(g, d.props, d.pP), Tr(d, g, m));
    }
    d.tag === ke ? o-- : r ? g.parentNode || t.appendChild(g) : a[o] !== g && a[o - 1] !== g && (a[o + 1] === g ? t.appendChild(a[o]) : t.insertBefore(g, l || a[o] || null));
  }
  if (e.pP && delete e.pP, i.length) {
    const u = [], h = [];
    i.forEach(([, d, , g, m]) => {
      d && u.push(d), g && h.push(g), m == null || m();
    }), u.forEach((d) => d()), h.length && requestAnimationFrame(() => {
      h.forEach((d) => d());
    });
  }
}, "Tr");
var _n = /* @__PURE__ */ __name2((e, t) => !!(e && e.length === t.length && e.every((r, n) => r[1] === t[n][1])), "_n");
var Xe = /* @__PURE__ */ new WeakMap();
var yt = /* @__PURE__ */ __name2((e, t, r) => {
  var i, a, o, l, f, u;
  const n = !r && t.pC;
  r && (t.pC || (t.pC = t.vC));
  let s;
  try {
    r || (r = typeof t.tag == "function" ? Hn(e, t) : He(t.props.children)), ((i = r[0]) == null ? void 0 : i.tag) === "" && r[0][ht] && (s = r[0][ht], e[5].push([e, s, t]));
    const h = n ? [...t.pC] : t.vC ? [...t.vC] : void 0, d = [];
    let g;
    for (let m = 0; m < r.length; m++) {
      Array.isArray(r[m]) && r.splice(m, 1, ...r[m].flat());
      let v = Fn(r[m]);
      if (v) {
        typeof v.tag == "function" && !v.tag[sr] && (we.length > 0 && (v[O][2] = we.map((b) => [b, b.values.at(-1)])), (a = e[5]) != null && a.length && (v[O][3] = e[5].at(-1)));
        let E;
        if (h && h.length) {
          const b = h.findIndex(B(v) ? (R) => B(R) : v.key !== void 0 ? (R) => R.key === v.key && R.tag === v.tag : (R) => R.tag === v.tag);
          b !== -1 && (E = h[b], h.splice(b, 1));
        }
        if (E) if (B(v)) E.t !== v.t && (E.t = v.t, E.d = true), v = E;
        else {
          const b = E.pP = E.props;
          if (E.props = v.props, E.f || (E.f = v.f || t.f), typeof v.tag == "function") {
            const R = E[O][2];
            E[O][2] = v[O][2] || [], E[O][3] = v[O][3], !E.f && ((E.o || E) === v.o || (l = (o = E.tag)[qr]) != null && l.call(o, b, E.props)) && _n(R, E[O][2]) && (E.s = true);
          }
          v = E;
        }
        else if (!B(v) && be) {
          const b = xe(be);
          b && (v.n = b);
        }
        if (!B(v) && !v.s && (yt(e, v), delete v.f), d.push(v), g && !g.s && !v.s) for (let b = g; b && !B(b); b = (f = b.vC) == null ? void 0 : f.at(-1)) b.nN = v;
        g = v;
      }
    }
    t.vR = n ? [...t.vC, ...h || []] : h || [], t.vC = d, n && delete t.pC;
  } catch (h) {
    if (t.f = true, h === _t) {
      if (s) return;
      throw h;
    }
    const [d, g, m] = ((u = t[O]) == null ? void 0 : u[3]) || [];
    if (g) {
      const v = /* @__PURE__ */ __name2(() => Ze([0, false, e[2]], m), "v"), E = Xe.get(m) || [];
      E.push(v), Xe.set(m, E);
      const b = g(h, () => {
        const R = Xe.get(m);
        if (R) {
          const A = R.indexOf(v);
          if (A !== -1) return R.splice(A, 1), v();
        }
      });
      if (b) {
        if (e[0] === 1) e[1] = true;
        else if (yt(e, m, [b]), (g.length === 1 || e !== d) && m.c) {
          $r(m, m.c, false);
          return;
        }
        throw _t;
      }
    }
    throw h;
  } finally {
    s && e[5].pop();
  }
}, "yt");
var Fn = /* @__PURE__ */ __name2((e) => {
  if (!(e == null || typeof e == "boolean")) {
    if (typeof e == "string" || typeof e == "number") return { t: e.toString(), d: true };
    if ("vR" in e && (e = { tag: e.tag, props: e.props, key: e.key, f: e.f, type: e.tag, ref: e.props.ref, o: e.o || e }), typeof e.tag == "function") e[O] = [0, []];
    else {
      const t = Nn[e.tag];
      t && (be || (be = ar("")), e.props.children = [{ tag: be, props: { value: e.n = `http://www.w3.org/${t}`, children: e.props.children } }]);
    }
    return e;
  }
}, "Fn");
var Ft = /* @__PURE__ */ __name2((e, t) => {
  var r, n;
  (r = t[O][2]) == null || r.forEach(([s, i]) => {
    s.values.push(i);
  });
  try {
    yt(e, t, void 0);
  } catch {
    return;
  }
  if (t.a) {
    delete t.a;
    return;
  }
  (n = t[O][2]) == null || n.forEach(([s]) => {
    s.values.pop();
  }), (e[0] !== 1 || !e[1]) && $r(t, t.c, false);
}, "Ft");
var Pe = /* @__PURE__ */ new WeakMap();
var Bt = [];
var Ze = /* @__PURE__ */ __name2(async (e, t) => {
  e[5] || (e[5] = []);
  const r = Pe.get(t);
  r && r[0](void 0);
  let n;
  const s = new Promise((i) => n = i);
  if (Pe.set(t, [n, () => {
    e[2] ? e[2](e, t, (i) => {
      Ft(i, t);
    }).then(() => n(t)) : (Ft(e, t), n(t));
  }]), Bt.length) Bt.at(-1).add(t);
  else {
    await Promise.resolve();
    const i = Pe.get(t);
    i && (Pe.delete(t), i[1]());
  }
  return s;
}, "Ze");
var Bn = /* @__PURE__ */ __name2((e, t, r) => ({ tag: ke, props: { children: e }, key: r, e: t, p: 1 }), "Bn");
var lt = 0;
var Lr = 1;
var ct = 2;
var ft = 3;
var ut = /* @__PURE__ */ new WeakMap();
var Nr = /* @__PURE__ */ __name2((e, t) => !e || !t || e.length !== t.length || t.some((r, n) => r !== e[n]), "Nr");
var Un = void 0;
var Ut = [];
var qn = /* @__PURE__ */ __name2((e) => {
  var a;
  const t = /* @__PURE__ */ __name2(() => typeof e == "function" ? e() : e, "t"), r = je.at(-1);
  if (!r) return [t(), () => {
  }];
  const [, n] = r, s = (a = n[O][1])[lt] || (a[lt] = []), i = n[O][0]++;
  return s[i] || (s[i] = [t(), (o) => {
    const l = Un, f = s[i];
    if (typeof o == "function" && (o = o(f[0])), !Object.is(o, f[0])) if (f[0] = o, Ut.length) {
      const [u, h] = Ut.at(-1);
      Promise.all([u === 3 ? n : Ze([u, false, l], n), h]).then(([d]) => {
        if (!d || !(u === 2 || u === 3)) return;
        const g = d.vC;
        requestAnimationFrame(() => {
          setTimeout(() => {
            g === d.vC && Ze([u === 3 ? 1 : 0, false, l], d);
          });
        });
      });
    } else Ze([0, false, l], n);
  }]);
}, "qn");
var xt = /* @__PURE__ */ __name2((e, t) => {
  var o;
  const r = je.at(-1);
  if (!r) return e;
  const [, n] = r, s = (o = n[O][1])[ct] || (o[ct] = []), i = n[O][0]++, a = s[i];
  return Nr(a == null ? void 0 : a[1], t) ? s[i] = [e, t] : e = s[i][0], e;
}, "xt");
var Wn = /* @__PURE__ */ __name2((e) => {
  const t = ut.get(e);
  if (t) {
    if (t.length === 2) throw t[1];
    return t[0];
  }
  throw e.then((r) => ut.set(e, [r]), (r) => ut.set(e, [void 0, r])), e;
}, "Wn");
var Kn = /* @__PURE__ */ __name2((e, t) => {
  var o;
  const r = je.at(-1);
  if (!r) return e();
  const [, n] = r, s = (o = n[O][1])[ft] || (o[ft] = []), i = n[O][0]++, a = s[i];
  return Nr(a == null ? void 0 : a[1], t) && (s[i] = [e(), t]), s[i][0];
}, "Kn");
var zn = ar({ pending: false, data: null, method: null, action: null });
var qt = /* @__PURE__ */ new Set();
var Vn = /* @__PURE__ */ __name2((e) => {
  qt.add(e), e.finally(() => qt.delete(e));
}, "Vn");
var St = /* @__PURE__ */ __name2((e, t) => Kn(() => (r) => {
  let n;
  e && (typeof e == "function" ? n = e(r) || (() => {
    e(null);
  }) : e && "current" in e && (e.current = r, n = /* @__PURE__ */ __name2(() => {
    e.current = null;
  }, "n")));
  const s = t(r);
  return () => {
    s == null || s(), n == null || n();
  };
}, [e]), "St");
var ue = /* @__PURE__ */ Object.create(null);
var Ue = /* @__PURE__ */ Object.create(null);
var Fe = /* @__PURE__ */ __name2((e, t, r, n, s) => {
  if (t != null && t.itemProp) return { tag: e, props: t, type: e, ref: t.ref };
  const i = document.head;
  let { onLoad: a, onError: o, precedence: l, blocking: f, ...u } = t, h = null, d = false;
  const g = qe[e];
  let m;
  if (g.length > 0) {
    const R = i.querySelectorAll(e);
    e: for (const A of R) for (const x of qe[e]) if (A.getAttribute(x) === t[x]) {
      h = A;
      break e;
    }
    if (!h) {
      const A = g.reduce((x, $) => t[$] === void 0 ? x : `${x}-${$}-${t[$]}`, e);
      d = !Ue[A], h = Ue[A] || (Ue[A] = (() => {
        const x = document.createElement(e);
        for (const $ of g) t[$] !== void 0 && x.setAttribute($, t[$]), t.rel && x.setAttribute("rel", t.rel);
        return x;
      })());
    }
  } else m = i.querySelectorAll(e);
  l = n ? l ?? "" : void 0, n && (u[We] = l);
  const v = xt((R) => {
    if (g.length > 0) {
      let A = false;
      for (const x of i.querySelectorAll(e)) {
        if (A && x.getAttribute(We) !== l) {
          i.insertBefore(R, x);
          return;
        }
        x.getAttribute(We) === l && (A = true);
      }
      i.appendChild(R);
    } else if (m) {
      let A = false;
      for (const x of m) if (x === R) {
        A = true;
        break;
      }
      A || i.insertBefore(R, i.contains(m[0]) ? m[0] : i.querySelector(e)), m = void 0;
    }
  }, [l]), E = St(t.ref, (R) => {
    var $;
    const A = g[0];
    if (r === 2 && (R.innerHTML = ""), (d || m) && v(R), !o && !a) return;
    let x = ue[$ = R.getAttribute(A)] || (ue[$] = new Promise((ce, te) => {
      R.addEventListener("load", ce), R.addEventListener("error", te);
    }));
    a && (x = x.then(a)), o && (x = x.catch(o)), x.catch(() => {
    });
  });
  if (s && f === "render") {
    const R = qe[e][0];
    if (t[R]) {
      const A = t[R], x = ue[A] || (ue[A] = new Promise(($, ce) => {
        v(h), h.addEventListener("load", $), h.addEventListener("error", ce);
      }));
      Wn(x);
    }
  }
  const b = { tag: e, type: e, props: { ...u, ref: E }, ref: E };
  return b.p = r, h && (b.e = h), Bn(b, i);
}, "Fe");
var Gn = /* @__PURE__ */ __name2((e) => {
  const t = Mn(), r = t && xe(t);
  return r != null && r.endsWith("svg") ? { tag: "title", props: e, type: "title", ref: e.ref } : Fe("title", e, void 0, false, false);
}, "Gn");
var Xn = /* @__PURE__ */ __name2((e) => !e || ["src", "async"].some((t) => !e[t]) ? { tag: "script", props: e, type: "script", ref: e.ref } : Fe("script", e, 1, false, true), "Xn");
var Zn = /* @__PURE__ */ __name2((e) => !e || !["href", "precedence"].every((t) => t in e) ? { tag: "style", props: e, type: "style", ref: e.ref } : (e["data-href"] = e.href, delete e.href, Fe("style", e, 2, true, true)), "Zn");
var Jn = /* @__PURE__ */ __name2((e) => !e || ["onLoad", "onError"].some((t) => t in e) || e.rel === "stylesheet" && (!("precedence" in e) || "disabled" in e) ? { tag: "link", props: e, type: "link", ref: e.ref } : Fe("link", e, 1, "precedence" in e, true), "Jn");
var Yn = /* @__PURE__ */ __name2((e) => Fe("meta", e, void 0, false, false), "Yn");
var Mr = Symbol();
var Qn = /* @__PURE__ */ __name2((e) => {
  const { action: t, ...r } = e;
  typeof t != "function" && (r.action = t);
  const [n, s] = qn([null, false]), i = xt(async (f) => {
    const u = f.isTrusted ? t : f.detail[Mr];
    if (typeof u != "function") return;
    f.preventDefault();
    const h = new FormData(f.target);
    s([h, true]);
    const d = u(h);
    d instanceof Promise && (Vn(d), await d), s([null, true]);
  }, []), a = St(e.ref, (f) => (f.addEventListener("submit", i), () => {
    f.removeEventListener("submit", i);
  })), [o, l] = n;
  return n[1] = false, { tag: zn, props: { value: { pending: o !== null, data: o, method: o ? "post" : null, action: o ? t : null }, children: { tag: "form", props: { ...r, ref: a }, type: "form", ref: a } }, f: l };
}, "Qn");
var Dr = /* @__PURE__ */ __name2((e, { formAction: t, ...r }) => {
  if (typeof t == "function") {
    const n = xt((s) => {
      s.preventDefault(), s.currentTarget.form.dispatchEvent(new CustomEvent("submit", { detail: { [Mr]: t } }));
    }, []);
    r.ref = St(r.ref, (s) => (s.addEventListener("click", n), () => {
      s.removeEventListener("click", n);
    }));
  }
  return { tag: e, props: r, type: e, ref: r.ref };
}, "Dr");
var es = /* @__PURE__ */ __name2((e) => Dr("input", e), "es");
var ts = /* @__PURE__ */ __name2((e) => Dr("button", e), "ts");
Object.assign(dt, { title: Gn, script: Xn, style: Zn, link: Jn, meta: Yn, form: Qn, input: es, button: ts });
Et(null);
new TextEncoder();
var rs = Et(null);
var ns = /* @__PURE__ */ __name2((e, t, r, n) => (s, i) => {
  const a = "<!DOCTYPE html>", o = r ? $t((f) => r(f, e), { Layout: t, ...i }, s) : s, l = Ur`${M(a)}${$t(rs.Provider, { value: e }, o)}`;
  return e.html(l);
}, "ns");
var ss = /* @__PURE__ */ __name2((e, t) => function(n, s) {
  const i = n.getLayout() ?? rn;
  return e && n.setLayout((a) => e({ ...a, Layout: i }, n)), n.setRenderer(ns(n, i, e)), s();
}, "ss");
var is = ss(({ children: e }) => S("html", { lang: "ko", children: [S("head", { children: [S("meta", { charSet: "utf-8" }), S("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), S("title", { children: "\uC9C1\uC18C \uD37C\uC990" }), S("link", { href: "/static/style.css", rel: "stylesheet" })] }), S("body", { children: [e, S("script", { type: "module", src: "/static/app.js" })] })] }));
var Pt = new Cr();
Pt.use(is);
Pt.get("/", (e) => e.render(S("main", { class: "container", children: [S("header", { class: "top", children: [S("h1", { children: "\uC9C1\uC18C \uD37C\uC990" }), S("div", { class: "controls", children: [S("label", { children: ["\uB09C\uC774\uB3C4", S("select", { id: "difficulty", children: [S("option", { value: "3", children: "3 \xD7 3" }), S("option", { value: "4", selected: true, children: "4 \xD7 4" }), S("option", { value: "6", children: "6 \xD7 6" }), S("option", { value: "8", children: "8 \xD7 8" })] })] }), S("button", { id: "shuffle", children: "\uC11E\uAE30" }), S("button", { id: "peek", children: "\uC6D0\uBCF8 \uBCF4\uAE30" }), S("button", { id: "reset", children: "\uB9AC\uC14B" })] }), S("div", { class: "stats", children: [S("span", { children: ["\uC2DC\uAC04: ", S("b", { id: "time", children: "00:00" })] }), S("span", { children: ["\uC774\uB3D9: ", S("b", { id: "moves", children: "0" })] })] })] }), S("section", { class: "boards", children: [S("div", { class: "board", id: "board" }), S("div", { class: "preview", children: S("img", { id: "preview", alt: "\uC6D0\uBCF8" }) })] }), S("footer", { class: "bottom", children: S("label", { class: "imgurl", children: ["\uC774\uBBF8\uC9C0 URL", S("input", { type: "url", id: "imgUrl", placeholder: "\uC774\uBBF8\uC9C0 \uC8FC\uC18C \uBD99\uC5EC\uB123\uAE30" }), S("button", { id: "loadImg", children: "\uBD88\uB7EC\uC624\uAE30" })] }) })] })));
var Wt = new Cr();
var as = Object.assign({ "/src/index.tsx": Pt });
var Hr = false;
for (const [, e] of Object.entries(as)) e && (Wt.all("*", (t) => {
  let r;
  try {
    r = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, r);
}), Wt.notFound((t) => {
  let r;
  try {
    r = t.executionCtx;
  } catch {
  }
  return e.fetch(t.req.raw, t.env, r);
}), Hr = true);
if (!Hr) throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");
var drainBody = /* @__PURE__ */ __name2(async (request, env22, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env22);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env22, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env22);
  } catch (e) {
    const error32 = reduceError(e);
    return Response.json(error32, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = Wt;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env22, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env22, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env22, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env22, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env22, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env22, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env22, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env22, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env22, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env22, ctx) => {
      this.env = env22;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/pages-dev-util.ts
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
__name(isRoutingRuleMatch, "isRoutingRuleMatch");
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}
__name(transformRoutingRuleToRegExp, "transformRoutingRuleToRegExp");

// .wrangler/tmp/pages-oOe4yN/l58iq91tqwl.js
var define_ROUTES_default = { version: 1, include: ["/*"], exclude: ["/static/*"] };
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env3, context3) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env3.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = middleware_loader_entry_default;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env3, context3);
      }
    }
    return env3.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e) {
    const error4 = reduceError2(e);
    return Response.json(error4, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-XTQWPO/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = pages_dev_pipeline_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env3, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-XTQWPO/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=l58iq91tqwl.js.map

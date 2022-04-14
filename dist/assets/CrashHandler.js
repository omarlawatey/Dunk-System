"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const CrashHandler = async () => {
  process.on('unhandledRejection', (reason, p) => {
    console.log(`[Crash-Handler] :: Unhandled Rejection/catch`);
    console.log(reason, p);
  });
  process.on('uncaughtException', (reason, p) => {
    console.log(`[Crash-Handler] :: Uncaught Exception/catch`);
    console.log(reason, p);
  });
  process.on('uncaughtExceptionMonitor', (reason, p) => {
    console.log(`[Crash-Handler] :: Uncaught Exception Monitor/catch`);
    console.log(reason, p);
  });
  process.on('multipleResolves', (reason, p) => {
    console.log(`[Crash-Handler] :: Unhandled MultipleResolves/catch`);
    console.log(reason, p);
  });
};

var _default = CrashHandler;
exports.default = _default;
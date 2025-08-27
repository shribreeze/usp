/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./lib/config.ts":
/*!***********************!*\
  !*** ./lib/config.ts ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CONTRACTS: () => (/* binding */ CONTRACTS),\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   somniaTestnet: () => (/* binding */ somniaTestnet)\n/* harmony export */ });\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var wagmi_connectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi/connectors */ \"wagmi/connectors\");\n/* harmony import */ var viem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! viem */ \"viem\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([wagmi__WEBPACK_IMPORTED_MODULE_0__, wagmi_connectors__WEBPACK_IMPORTED_MODULE_1__, viem__WEBPACK_IMPORTED_MODULE_2__]);\n([wagmi__WEBPACK_IMPORTED_MODULE_0__, wagmi_connectors__WEBPACK_IMPORTED_MODULE_1__, viem__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n// Somnia testnet configuration\nconst somniaTestnet = (0,viem__WEBPACK_IMPORTED_MODULE_2__.defineChain)({\n    id: 50312,\n    name: 'Somnia Testnet',\n    nativeCurrency: {\n        decimals: 18,\n        name: 'STT',\n        symbol: 'STT'\n    },\n    rpcUrls: {\n        default: {\n            http: [\n                'https://dream-rpc.somnia.network'\n            ]\n        }\n    },\n    blockExplorers: {\n        default: {\n            name: 'Somnia Testnet Explorer',\n            url: 'https://shannon-explorer.somnia.network'\n        }\n    }\n});\nconst config = (0,wagmi__WEBPACK_IMPORTED_MODULE_0__.createConfig)({\n    chains: [\n        somniaTestnet\n    ],\n    connectors: [\n        (0,wagmi_connectors__WEBPACK_IMPORTED_MODULE_1__.metaMask)()\n    ],\n    transports: {\n        [somniaTestnet.id]: (0,wagmi__WEBPACK_IMPORTED_MODULE_0__.http)()\n    },\n    ssr: false\n});\n// Contract addresses (deployed on Somnia testnet)\nconst CONTRACTS = {\n    SUBSCRIPTION_MANAGER: '0x62D69EcE0806188dCC981bF9B5F9dC39b173df71',\n    NFT_ACCESS_PASS: '0x4C2D391b2C3F9ee868eB8c36d40Ada064A663C16'\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2xpYi9jb25maWcudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQTBDO0FBQ0M7QUFDVDtBQUVsQywrQkFBK0I7QUFDeEIsTUFBTUksZ0JBQWdCRCxpREFBV0EsQ0FBQztJQUN2Q0UsSUFBSTtJQUNKQyxNQUFNO0lBQ05DLGdCQUFnQjtRQUNkQyxVQUFVO1FBQ1ZGLE1BQU07UUFDTkcsUUFBUTtJQUNWO0lBQ0FDLFNBQVM7UUFDUEMsU0FBUztZQUFFVixNQUFNO2dCQUFDO2FBQW1DO1FBQUM7SUFDeEQ7SUFDQVcsZ0JBQWdCO1FBQ2RELFNBQVM7WUFBRUwsTUFBTTtZQUEyQk8sS0FBSztRQUEwQztJQUM3RjtBQUNGLEdBQUU7QUFFSyxNQUFNQyxTQUFTZCxtREFBWUEsQ0FBQztJQUNqQ2UsUUFBUTtRQUFDWDtLQUFjO0lBQ3ZCWSxZQUFZO1FBQUNkLDBEQUFRQTtLQUFHO0lBQ3hCZSxZQUFZO1FBQ1YsQ0FBQ2IsY0FBY0MsRUFBRSxDQUFDLEVBQUVKLDJDQUFJQTtJQUMxQjtJQUNBaUIsS0FBSztBQUNQLEdBQUU7QUFFRixrREFBa0Q7QUFDM0MsTUFBTUMsWUFBWTtJQUN2QkMsc0JBQXNCO0lBQ3RCQyxpQkFBaUI7QUFDbkIsRUFBQyIsInNvdXJjZXMiOlsiL2hvbWUvc2FtZWVyZ2F1dGFtL1Byb2plY3RzL1VTUC1Qcm9qZWN0L3VzcC9saWIvY29uZmlnLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNvbmZpZywgaHR0cCB9IGZyb20gJ3dhZ21pJ1xuaW1wb3J0IHsgbWV0YU1hc2sgfSBmcm9tICd3YWdtaS9jb25uZWN0b3JzJ1xuaW1wb3J0IHsgZGVmaW5lQ2hhaW4gfSBmcm9tICd2aWVtJ1xuXG4vLyBTb21uaWEgdGVzdG5ldCBjb25maWd1cmF0aW9uXG5leHBvcnQgY29uc3Qgc29tbmlhVGVzdG5ldCA9IGRlZmluZUNoYWluKHtcbiAgaWQ6IDUwMzEyLFxuICBuYW1lOiAnU29tbmlhIFRlc3RuZXQnLFxuICBuYXRpdmVDdXJyZW5jeToge1xuICAgIGRlY2ltYWxzOiAxOCxcbiAgICBuYW1lOiAnU1RUJyxcbiAgICBzeW1ib2w6ICdTVFQnLFxuICB9LFxuICBycGNVcmxzOiB7XG4gICAgZGVmYXVsdDogeyBodHRwOiBbJ2h0dHBzOi8vZHJlYW0tcnBjLnNvbW5pYS5uZXR3b3JrJ10gfSxcbiAgfSxcbiAgYmxvY2tFeHBsb3JlcnM6IHtcbiAgICBkZWZhdWx0OiB7IG5hbWU6ICdTb21uaWEgVGVzdG5ldCBFeHBsb3JlcicsIHVybDogJ2h0dHBzOi8vc2hhbm5vbi1leHBsb3Jlci5zb21uaWEubmV0d29yaycgfSxcbiAgfSxcbn0pXG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSBjcmVhdGVDb25maWcoe1xuICBjaGFpbnM6IFtzb21uaWFUZXN0bmV0XSxcbiAgY29ubmVjdG9yczogW21ldGFNYXNrKCldLFxuICB0cmFuc3BvcnRzOiB7XG4gICAgW3NvbW5pYVRlc3RuZXQuaWRdOiBodHRwKCksXG4gIH0sXG4gIHNzcjogZmFsc2UsXG59KVxuXG4vLyBDb250cmFjdCBhZGRyZXNzZXMgKGRlcGxveWVkIG9uIFNvbW5pYSB0ZXN0bmV0KVxuZXhwb3J0IGNvbnN0IENPTlRSQUNUUyA9IHtcbiAgU1VCU0NSSVBUSU9OX01BTkFHRVI6ICcweDYyRDY5RWNFMDgwNjE4OGRDQzk4MWJGOUI1RjlkQzM5YjE3M2RmNzEnLFxuICBORlRfQUNDRVNTX1BBU1M6ICcweDRDMkQzOTFiMkMzRjllZTg2OGVCOGMzNmQ0MEFkYTA2NEE2NjNDMTYnLFxufSJdLCJuYW1lcyI6WyJjcmVhdGVDb25maWciLCJodHRwIiwibWV0YU1hc2siLCJkZWZpbmVDaGFpbiIsInNvbW5pYVRlc3RuZXQiLCJpZCIsIm5hbWUiLCJuYXRpdmVDdXJyZW5jeSIsImRlY2ltYWxzIiwic3ltYm9sIiwicnBjVXJscyIsImRlZmF1bHQiLCJibG9ja0V4cGxvcmVycyIsInVybCIsImNvbmZpZyIsImNoYWlucyIsImNvbm5lY3RvcnMiLCJ0cmFuc3BvcnRzIiwic3NyIiwiQ09OVFJBQ1RTIiwiU1VCU0NSSVBUSU9OX01BTkFHRVIiLCJORlRfQUNDRVNTX1BBU1MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./lib/config.ts\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wagmi */ \"wagmi\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ \"@tanstack/react-query\");\n/* harmony import */ var _lib_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/config */ \"(pages-dir-node)/./lib/config.ts\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([wagmi__WEBPACK_IMPORTED_MODULE_1__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__, _lib_config__WEBPACK_IMPORTED_MODULE_3__]);\n([wagmi__WEBPACK_IMPORTED_MODULE_1__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__, _lib_config__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nconst queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.QueryClient();\nfunction App({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(wagmi__WEBPACK_IMPORTED_MODULE_1__.WagmiProvider, {\n        config: _lib_config__WEBPACK_IMPORTED_MODULE_3__.config,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.QueryClientProvider, {\n            client: queryClient,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/home/sameergautam/Projects/USP-Project/usp/pages/_app.tsx\",\n                lineNumber: 13,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/home/sameergautam/Projects/USP-Project/usp/pages/_app.tsx\",\n            lineNumber: 12,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/sameergautam/Projects/USP-Project/usp/pages/_app.tsx\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNxQztBQUNtQztBQUNsQztBQUNSO0FBRTlCLE1BQU1JLGNBQWMsSUFBSUgsOERBQVdBO0FBRXBCLFNBQVNJLElBQUksRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQVk7SUFDNUQscUJBQ0UsOERBQUNQLGdEQUFhQTtRQUFDRyxRQUFRQSwrQ0FBTUE7a0JBQzNCLDRFQUFDRCxzRUFBbUJBO1lBQUNNLFFBQVFKO3NCQUMzQiw0RUFBQ0U7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7OztBQUloQyIsInNvdXJjZXMiOlsiL2hvbWUvc2FtZWVyZ2F1dGFtL1Byb2plY3RzL1VTUC1Qcm9qZWN0L3VzcC9wYWdlcy9fYXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnXG5pbXBvcnQgeyBXYWdtaVByb3ZpZGVyIH0gZnJvbSAnd2FnbWknXG5pbXBvcnQgeyBRdWVyeUNsaWVudCwgUXVlcnlDbGllbnRQcm92aWRlciB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSdcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4uL2xpYi9jb25maWcnXG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcydcblxuY29uc3QgcXVlcnlDbGllbnQgPSBuZXcgUXVlcnlDbGllbnQoKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxXYWdtaVByb3ZpZGVyIGNvbmZpZz17Y29uZmlnfT5cbiAgICAgIDxRdWVyeUNsaWVudFByb3ZpZGVyIGNsaWVudD17cXVlcnlDbGllbnR9PlxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICA8L1F1ZXJ5Q2xpZW50UHJvdmlkZXI+XG4gICAgPC9XYWdtaVByb3ZpZGVyPlxuICApXG59Il0sIm5hbWVzIjpbIldhZ21pUHJvdmlkZXIiLCJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJjb25maWciLCJxdWVyeUNsaWVudCIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImNsaWVudCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@tanstack/react-query":
/*!****************************************!*\
  !*** external "@tanstack/react-query" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "viem":
/*!***********************!*\
  !*** external "viem" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = import("viem");;

/***/ }),

/***/ "wagmi":
/*!************************!*\
  !*** external "wagmi" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi");;

/***/ }),

/***/ "wagmi/connectors":
/*!***********************************!*\
  !*** external "wagmi/connectors" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = import("wagmi/connectors");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();
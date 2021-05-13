"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
/* eslint-disable prettier/prettier */
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_agora_1 = require("react-native-agora");
var Permission_1 = require("../utils/Permission");
var HeartReaction_1 = require("./HeartReaction");
/**
 * TASK: Create a free AgoraIO Account
 * Use APP ID from your Agora project
 * @see https://docs.agora.io/en/Agora%20Platform/token#a-name--appidause-an-app-id-for-authentication
 */
var AGORA_APP_ID = '4cff297aa3c84fb3a3535ac9dde6b826';
/**
 * TASK: Generate temporary token generated on Agora dashboard (valid for 24 hours)
 * or create a lambda / firebase function for generating Token via API call (optional)
 * @see https://docs.agora.io/en/Agora%20Platform/token#3-generate-a-token
 */
var TEMP_TOKEN_ID = '0064cff297aa3c84fb3a3535ac9dde6b826IABoloHWapXtUesGGOp9CldYVoYY9Rs407Nwqk4ZOuuH9TXeZnkAAAAAEAD4YHXYGM+bYAEAAQAWz5tg';
var CHANNEL_NAME = 'ButterUs';
var Main = function () {
    var AgoraEngine = react_1.useRef();
    var token = react_1.useState(TEMP_TOKEN_ID)[0];
    var channelName = react_1.useState(CHANNEL_NAME)[0]; // Use this to generate token on Agora dashboard
    var _a = react_1.useState(false), joinSucceed = _a[0], setJoinSucceed = _a[1];
    var _b = react_1.useState([]), peerIds = _b[0], setPeerIds = _b[1];
    /**
     * TASK: Add redux and migrate heart states to redux
     */
    var _c = react_1.useState([]), hearts = _c[0], setHearts = _c[1];
    var _d = react_1.useState([]), heartsElements = _d[0], setHeartsElements = _d[1];
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (react_native_1.Platform.OS === 'android') {
                        Permission_1["default"]().then(function () {
                            console.log('requested!');
                        });
                    }
                    _a = AgoraEngine;
                    return [4 /*yield*/, react_native_agora_1["default"].create(AGORA_APP_ID)];
                case 1:
                    _a.current = _b.sent();
                    return [4 /*yield*/, AgoraEngine.current.enableVideo()];
                case 2:
                    _b.sent();
                    AgoraEngine.current.addListener('Warning', function (warn) {
                        console.log('Warning', warn);
                    });
                    AgoraEngine.current.addListener('Error', function (err) {
                        console.log('Error', err);
                    });
                    AgoraEngine.current.addListener('UserJoined', function (uid, elapsed) {
                        console.log('UserJoined', uid, elapsed);
                        if (peerIds.indexOf(uid) === -1) {
                            setPeerIds(__spreadArrays(peerIds, [uid]));
                        }
                    });
                    AgoraEngine.current.addListener('UserOffline', function (uid, reason) {
                        console.log('UserOffline', uid, reason);
                        setPeerIds(peerIds.filter(function (id) { return id !== uid; }));
                    });
                    AgoraEngine.current.addListener('JoinChannelSuccess', function (channel, uid, elapsed) {
                        console.log('JoinChannelSuccess', channel, uid, elapsed);
                        setJoinSucceed(true);
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var endCall = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!AgoraEngine.current) return [3 /*break*/, 2];
                    return [4 /*yield*/, AgoraEngine.current.leaveChannel()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    setPeerIds([]);
                    setJoinSucceed(false);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        init();
        return function () {
            endCall();
        };
    }, []);
    /**
     * TASK: Add redux middleware and handle this Side Effect in middleware
     * Bonus: use Debounce on showing the heart for enhanced performance
     */
    react_1.useEffect(function () {
        if (hearts.length > 0) {
            var heartElements = hearts.map(function (heart) {
                return (react_1["default"].createElement(react_native_1.View, { style: styles.heartContainer, key: heart.id },
                    react_1["default"].createElement(HeartReaction_1["default"], { color: "red", size: 2 })));
            });
            setHeartsElements(heartElements);
            setTimeout(function () {
                setHearts([]);
            }, 1000);
        }
    }, [hearts]);
    var startCall = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ((_a = AgoraEngine.current) === null || _a === void 0 ? void 0 : _a.joinChannel(token, channelName, null, 0))];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var renderVideos = function () {
        return joinSucceed ? (react_1["default"].createElement(react_native_1.View, { style: styles.fullView },
            react_1["default"].createElement(react_native_agora_1.RtcLocalView.SurfaceView, { style: styles.max, channelId: channelName, renderMode: react_native_agora_1.VideoRenderMode.Hidden }),
            heartsElements,
            renderRemoteVideos())) : null;
    };
    var renderRemoteVideos = function () {
        return (react_1["default"].createElement(react_native_1.ScrollView, { style: styles.remoteContainer, contentContainerStyle: { paddingHorizontal: 2.5 }, horizontal: true }, peerIds.map(function (value) {
            return (react_1["default"].createElement(react_native_agora_1.RtcRemoteView.SurfaceView, { style: styles.remote, uid: value, channelId: channelName, renderMode: react_native_agora_1.VideoRenderMode.Hidden, zOrderMediaOverlay: true }));
        })));
    };
    /**
     * TASK: Dispatch side effect to middleware for handling new heart added action
     */
    var addHeart = function () {
        setHearts(__spreadArrays(hearts, [{ id: Math.round(Math.random() * 1000) }]));
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.max },
        react_1["default"].createElement(react_native_1.View, { style: styles.max },
            renderVideos(),
            react_1["default"].createElement(react_native_1.View, { style: styles.buttonHolder },
                react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: startCall, style: styles.button },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, " Start Call ")),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: endCall, style: styles.button },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, " End Call ")),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: addHeart, style: styles.button },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, " Like "))))));
};
exports["default"] = Main;
var dimensions = {
    width: react_native_1.Dimensions.get('window').width,
    height: react_native_1.Dimensions.get('window').height
};
var styles = react_native_1.StyleSheet.create({
    max: {
        flex: 1
    },
    buttonHolder: {
        height: 100,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0093E9',
        borderRadius: 25
    },
    buttonText: {
        color: '#fff'
    },
    fullView: {
        width: dimensions.width,
        height: dimensions.height - 100
    },
    remoteContainer: {
        width: '100%',
        height: 150,
        position: 'absolute',
        top: 5
    },
    remote: {
        width: 150,
        height: 150,
        marginHorizontal: 2.5
    },
    noUserText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#0093E9'
    },
    heartContainer: {
        width: 10,
        height: 10,
        position: 'absolute',
        bottom: 24,
        right: 24
    }
});

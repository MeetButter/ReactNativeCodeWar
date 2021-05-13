/* eslint-disable prettier/prettier */
import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import requestCameraAndAudioPermission from '../utils/Permission';
import HeartReaction from '../components/HeartReaction';
import { AGORA_APP_ID, CHANNEL_NAME, TEMP_TOKEN_ID } from '../utils/AgoraDetails';
import { connect } from 'react-redux';


interface Props {
  updateHeart: Function;
  hearts: any;
}
const Main: FunctionComponent<Props> = (props) => {
  const AgoraEngine = useRef<RtcEngine>();
  const [token] = useState<string>(TEMP_TOKEN_ID);
  const [channelName] = useState<string>(CHANNEL_NAME); // Use this to generate token on Agora dashboard
  const [joinSucceed, setJoinSucceed] = useState<boolean>(false);
  const [peerIds, setPeerIds] = useState<number[]>([]);
  const {updateHeart, hearts} =props
  /**
   * TASK: Add redux and migrate heart states to redux
   */

  const [callStarted, setCallStarted] = useState<boolean>(false);
  const [clickedHeart, setClickedHeart] = useState<boolean>(false);
  
  const [heartsElements, setHeartsElements] = useState<JSX.Element[]>([]);

  const init = async () => {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
      
      });
    }

    AgoraEngine.current = await RtcEngine.create(AGORA_APP_ID);
    await AgoraEngine.current.enableVideo();

    AgoraEngine.current.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    AgoraEngine.current.addListener('Error', (err) => {
      console.log('Error', err);
    });

    AgoraEngine.current.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      if (peerIds.indexOf(uid) === -1) {
        setPeerIds([...peerIds, uid]);
      }
    });

    AgoraEngine.current.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      setPeerIds(peerIds.filter((id) => id !== uid));
    });

    AgoraEngine.current.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        setJoinSucceed(true);
      }
    );
  };

  const endCall = async () => {
    if (AgoraEngine.current) await AgoraEngine.current.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
  };

  useEffect(() => {
    init();

    return () => {
      endCall();
    };
  }, []);

  /**
   * TASK: Add redux middleware and handle this Side Effect in middleware
   * Bonus: use Debounce on showing the heart for enhanced performance
   */
  useEffect(() => {

    if (callStarted) {
      if (hearts.length > 0) {
        const heartElements = hearts.map((heart) => {
          return (
            <View style={styles.heartContainer} key={heart.id}>
              <HeartReaction clicked={clickedHeart} color="red" size={2} />
            </View>
          );
        });
        setHeartsElements(heartElements);
        setTimeout(() => {
          hearts();
        }, 100);
      }
    }
 
  }, [hearts]);

  const startCall = async () => {
    setCallStarted(true)
    await AgoraEngine.current?.joinChannel(token, channelName, null, 0);

  };

  const renderVideos = () => {
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          channelId={channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {heartsElements}
        {renderRemoteVideos()}
      </View>
    ) : null;
  };

  const renderRemoteVideos = () => {
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{ paddingHorizontal: 2.5 }}
        horizontal={true}
      >
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  /**
   * TASK: Dispatch side effect to middleware for handling new heart added action
   */
  const addHeart = () => {

    if (!callStarted) {
      setClickedHeart(false)

    } else {
      setClickedHeart(true)
    }

    updateHeart(Math.round(Math.random() * 1000))
  
  };

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        {renderVideos()}
        <View style={styles.buttonHolder}>
          <TouchableOpacity onPress={startCall} style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={endCall} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={addHeart} style={styles.button}>
            <Text style={styles.buttonText}> Like </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch: (arg0: { type: string; id: any; }) => any)=>{
  return {
    updateHeart: (id: any) => dispatch({ type: "ADD_HEARTS", id: id })
    
  
  }
}
const mapStateToProps = (state: { likeReducer: { heart: any; } }) =>{
  return {
    hearts : state.likeReducer.heart
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  heartContainer: {
    width: 10,
    height: 10,
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});

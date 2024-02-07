import * as React from 'react';
import { Box, Row, Button } from 'rn-faiez-components';
import { TextInput } from 'react-native';
import VidView from '../components/VideoComponet/video';

export default () => {
  const [videoKey, setVideoKey] = React.useState(null);
  const [input, setInput] = React.useState('aLc0sqO2M2A');

  return (
    <Box flex bg={'#1f1f1f'}>
      <Row
        p={4}
        m={8}
        e={3}
        rounded={8}
        bg={'#3b3b3b'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder={'Enter Video ID ex : aLc0sqO2M2A '}
        />
        <Button
          btnOutline
          color={'white'}
          btnOutlineColor={'white'}
          style={{
            padding: 6,
            borderRadius : 6
          }}
          onPress={() => {
            
            setVideoKey(input);
          }}>
          load
        </Button>
      </Row>
      {videoKey && <VidView videoID={videoKey} />}
    </Box>
  );
};

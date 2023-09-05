import * as React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebScrapper({
  videoId,
  response,
  styles = {},
  onLoad,
  onLoadEnd,
  onError,
}) {
  const webRef = React.useRef(null);
  const [isLoaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
  }, []);
  return (
    <View
      style={
        styles
          ? styles
          : {
              width: 0,
              height: 0,
              backgroundColor: 'red',
              opacity: 0.99,
              overflow: 'hidden',
            }
      }>
      {isLoaded && (
        <WebView
          ref={webRef}
          originWhitelist={['*']}
          injectedJavaScript={`

          const post = (s) => {
            window.ReactNativeWebView.postMessage(JSON.stringify(s));
          };
          setTimeout(() => {
            const video_url = 'https://youtube.com/watch?v=${videoId}';
            const input = document.getElementById('sf_url');
            input.value = video_url;
            document.getElementById('sf_submit').click();
            const myInterval = setInterval(() => {
              const btn = document.getElementsByClassName('def-btn-box');
              const links =  document.querySelectorAll(".drop-down-box .links .main .link-group .link")
              if(links.length){
                clearInterval(myInterval)
                let all_links = []
                links.forEach(el => {
                  all_links.push({
                    title : el.getAttribute("download"),
                    url : el.href,
                    quality : el.getAttribute("data-quality")
                   })
                 }) 
                 post(all_links)
                   }
            }, 1000);

          }, 2000);
          `}
          source={{ uri: 'https://en.savefrom.net/' }}
          onMessage={(event) => {
            let request = JSON.parse(event.nativeEvent.data);
            response(request);
            setTimeout(() => {
              setLoaded(false);
            }, 1000);
          }}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURL={true}
          androidHardwareAccelerationDisabled={true}
          onLoad={onLoad}
          onLoadEnd={onLoadEnd}
          onError={onError}
          onHttpError={(e) => {
            console.error('http error' + e);
          }}
        />
      )}
    </View>
  );
}

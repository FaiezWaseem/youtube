import * as React from "react";
import { Row, Center, Text } from "rn-faiez-components";
import { TextInput } from "react-native";
import { Button } from "react-native";
import Storage from "../utils/AysncStorage";
export default ({ navigation }) => {
  const [input, setInput] = React.useState("");

  return (
    <Center flex bg={"#1f1f1f"}>
      <Text color={"white"} mb={15} fontSize={28}>
        Setting
      </Text>
      <Row
        p={8}
        m={8}
        e={3}
        bg={"#3b3b3b"}
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"80%"}
        rounded={8}
      >
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder={"Enter Server URL"}
          placeholderTextColor="#fff"
          style={{
            color: "#fff",
          }}
        />
      </Row>
      <Row>
        <Button
          title="SAVE"
          onPress={async () => {
            await Storage.save("serverURL", input);
            navigation.pop();
          }}
        ></Button>
      </Row>
    </Center>
  );
};

import React from "react";
import { Row, Box, Center } from "rn-faiez-components";
export default function VideoPlaceHolder() {
    return (
        <Box p={10} bg={'#323232'} w={'100%'} h={300} >
            <Box bg={'gray'} w={'100%'} h={200} ></Box>

            <Center
                pt={8}
                p={10}
                bg={'#383838'}
                style={{ flexDirection : 'row'}}
            >
                <Box w={'15%'} >
                    <Box
                        w={40}
                        h={40}
                        rounded={100}
                        bg={'gray'}
                    />
                </Box>
                <Box  w={'60%'} flex p={5} >
                    <Row w={'90%'} h={20} m={2} bg={'gray'} rounded={5} ></Row>
                    <Row w={'40%'} h={20} m={2} bg={'gray'} rounded={5} ></Row>
                </Box>

            </Center>

        </Box>
    );
}

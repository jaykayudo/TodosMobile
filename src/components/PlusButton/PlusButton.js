import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { color } from "../../utils/colors";

const PlusButton = ({onPress}) => {
    return ( 
        <View style={styles.buttonContainer}>
        <Button mode={"contained"} onPress={onPress} style={styles.plusButton} >
            <Text style={styles.buttonText}>
                +
            </Text>
        </Button>
        </View>
     );
}
 
export default PlusButton;


const styles = StyleSheet.create({
    plusButton:{
        backgroundColor: color.ui.brand,
        color: color.bg.primary,
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        
        
    },
    buttonText:{
        fontSize:30,
        textAlign:"center",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer:{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position:"absolute",
        bottom: 5
    }
})
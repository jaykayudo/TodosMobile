import { Button } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { color } from "../../utils/colors";
import { useState } from "react";
const Todos = ({title,onFinish,onCancel,finished=false,expired=false}) => {
    const [todoFinish, setTodoFinish] = useState(finished)
    const finishTodo = ()=>{
        onFinish()
        setTodoFinish(true)
    }
    return ( 
        <View style={styles.box}>
            
            {todoFinish && (
                <View style={styles.successcancelLine}></View>
            )}
            {!todoFinish && expired ? (
                <View style={styles.failcancelLine}></View>
            ):null}
            <Text style={styles.titleText}>
                {title}
            </Text>
                {!todoFinish && !expired && (
                <View style={styles.buttonContainer}>
                    <Button style={styles.smallButtons} onPress={finishTodo}  icon={"check"}></Button>
                    {/* <Button style={styles.smallButtons} onPress={onFinish}  icon={"delete"}></Button> */}
                </View>
                )}
                
        </View>
     );
}

export default Todos;
const styles = StyleSheet.create({
    box:{
        paddingVertical: 15,
        paddingHorizontal: 10,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor: color.bg.dark,
        marginBottom:10,
        position:"relative"
    },
    titleText:{
        color:color.text.inverse,
        fontSize: 16,
        width:"80%",
    },
    actions:{
        width:"20%",
    },
    smallButtons:{
        width: 20,
        height:20,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color.ui.success,
        color: color.ui.quaternary
    },
    failcancelLine:{
        width: "100%",
        height: 3,
        backgroundColor:color.ui.error,
        position: "absolute",
        zIndex: 23,
        left:10
    },
    successcancelLine:{
        width: "100%",
        height: 3,
        backgroundColor:color.ui.brand,
        position: "absolute",
        zIndex: 23,
        left:10
    },
    buttonContainer:{
        display:"flex",
        flexDirection:"row"
    }
})
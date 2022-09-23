import { StyleSheet, View, Text } from "react-native";
import { useState, useContext } from "react";
import { TextInput, Divider, Button, Snackbar } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { color } from "../../../utils/colors";
import { TodosContext } from "../../../context/TodosContext";
const CreateEvent = ({navigation}) => {
    const [titleValue, setTitleValue] = useState("")
    const [dateValue, setDateValue] = useState(new Date())
    const [show, setShow] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [errorText,setErrorText] = useState(null)
    const todoCtx = useContext(TodosContext);
    const submitForm =()=>{
        if(titleValue.length < 1){
            setErrorText("Enter A Title")
            setShowSnack(true)
            return
        }
        todoCtx.addSection(titleValue,dateValue)
        navigation.navigate("home")
    }
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDateValue(currentDate);
      };
    return ( 
        <View  style={styles.container}>
            <Text style={styles.titleText}>
                Create Event
            </Text>
            <Divider style={{backgroundColor:"white"}} />
            <TextInput
                style={styles.inputs}
                label='Title'
                mode='outlined'
                value={titleValue}
                onChangeText={(text)=>setTitleValue(text)}
                placeholderTextColor="#ffffff"
                activeOutlineColor={color.ui.brand}
                selectionColor={color.ui.tertiary}
                maxLength={30}
                theme={{ colors: { text: color.ui.quaternary,placeholder: 'white' } }}
                onSubmitEditing={submitForm}
            />
            <TextInput
                style={styles.inputs}
                label='Date'
                mode='outlined'
                value={`${dateValue.toLocaleDateString('en-GB')}`}
                onPressIn={()=>(setShow(true))}
                placeholderTextColor="#ffffff"
                activeOutlineColor={color.ui.brand}
                selectionColor={"#ffffff"}
                theme={{ colors: { text: color.ui.quaternary,placeholder: 'white' } }}
            />
            <Button
                style={styles.buttonStyle}
                icon='plus'
                mode='contained'
                onPress={submitForm}
            >
                Create
            </Button>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={dateValue}
                mode={"date"}
                is24Hour={true}
                onChange={onDateChange}
                minimumDate={new Date()}
                />
        )}
            <Snackbar
                visible={ showSnack}
                onDismiss={()=>{setShowSnack(false)} }
                duration={
                    Snackbar.DURATION_MEDIUM
                }
                style={{width:"100%"}}
                action={{
                    label: 'Dismiss',
                    onPress: () => {
                      setShowSnack(false)
                    },
                }}
                >
                   {errorText}
            </Snackbar>
        </View>
     );
}
 
export default CreateEvent;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.bg.lightDark,
        paddingHorizontal: 20
    },
    inputs:{
        marginTop: 15,
        color:color.ui.quaternary,
        backgroundColor:color.bg.dark
    },
    titleText:{
        fontSize: 25,
        textAlign:"center",
        paddingVertical: 10,
        color: color.text.inverse
    },
    buttonStyle:{
        backgroundColor:color.ui.brand,
        marginTop: 20
    }
})
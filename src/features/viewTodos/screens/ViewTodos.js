import { Text, StyleSheet, View, FlatList } from "react-native";
import PlusButton from "../../../components/PlusButton/PlusButton";
import { color } from "../../../utils/colors";
import { Provider,Modal,Portal, TextInput,Button } from "react-native-paper";
import Todos from "../../../components/Todos/Todos";
import { useState, useContext } from "react";
import { TodosContext } from "../../../context/TodosContext";
const ViewTodos = ({navigation, route}) => {
    const {data} = route.params;
    const [titleValue, setTitleValue] = useState("")
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const todoCtx = useContext(TodosContext);

    const onTodoFinish =(parentId,id)=>{
        todoCtx.finishTodos(parentId,id)
    }
    const addTodos =()=>{
        if(titleValue.length < 1){
            return
        }
        todoCtx.addTodos(data.id,titleValue)
        setTitleValue("")
        hideModal()
    }

    return (
        <>
        <Provider>
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} style={styles.modalStyle} contentContainerStyle={styles.modalContentStyle}>
            <Text style={styles.modalText}>Add Todos</Text>
            <View style={styles.formContainer}>
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
                theme={{ colors: { text: color.ui.quaternary, placeholder: 'white' } }}
            />
                <Button  mode="contained" style={styles.addButton} onPress={addTodos} icon={"plus"} color={color.ui.brand}>
                    Add
                </Button>
                
            </View>
            </Modal>
      </Portal>
        <View style={styles.container}>
            <Text style={styles.bigText}>{data.title}</Text>
            <FlatList 
                data={data.todos}
                renderItem={(item)=>(<Todos title={item.item.title} key={item.item.id} finished={item.item.finished} expired={data.expired} onFinish={()=>(onTodoFinish(data.id, item.item.id))} />)}
                contentContainerStyle = {styles.listSpacingStyle}
                keyExtractor ={(item)=>item.id}
                style={styles.list}
            />
           
        </View> 
         <PlusButton  onPress={()=>showModal()}/>
         </Provider>
         </>
     );
}
 
export default ViewTodos;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.bg.lightDark
    },
    list:{
        paddingHorizontal:5,
        paddingVertical: 10,
        backgroundColor: color.bg.lightDark
    },
    listSpacingStyle:{
        marginBottom: 5
    },
    bigText:{
        fontSize: 20,
        color: color.ui.quaternary,
        textAlign: "center",
        textTransform:"uppercase",
        paddingVertical: 20,
       
    },
    smallText:{
        fontSize: 14,
        textTransform:"lowercase",
        color:color.ui.brand
    },
    modalText:{
        fontSize: 18,
        color: color.ui.quaternary,
        textAlign: "center",
    },
    modalStyle:{
        paddingHorizontal: 10
    },
    modalContentStyle:{
        backgroundColor: color.bg.lightDark,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    formContainer:{
        paddingHorizontal: 15
    },
    inputs:{
        marginTop: 15,
        color:color.ui.quaternary,
        backgroundColor:color.bg.dark
    },
    addButton:{
        marginTop: 15,
    }
})
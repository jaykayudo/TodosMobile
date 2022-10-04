import { Text,View, StyleSheet, FlatList } from "react-native";
import { useContext, useState } from "react";
import { Provider,Portal,Modal,Button } from "react-native-paper";
import PlusButton from "../../../components/PlusButton/PlusButton";
import TodoSection from "../../../components/TodoSection/TodoSection";
import { TodosContext } from "../../../context/TodosContext";
import { color } from "../../../utils/colors";
const HomeScreen = ({navigation}) => {
    const todoCtx = useContext(TodosContext);
    const navigateToTodos = (item)=>{
        navigation.navigate("viewTodos",{data:item})
    }
    const [deleteText, setDeleteText] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [visible, setVisible] = useState(false);
    const showModal = () => {
        setVisible(true)
    };
    const hideModal = () => {
        setDeleteId("")
        setDeleteText("")
        setVisible(false)
    };
    const longPressEvent = (text,id)=>{
        setDeleteText(text)
        setDeleteId(id)
        showModal()
    }
    const performDelete = ()=>{
        todoCtx.deleteSection(deleteId)
        hideModal()
    }
    return (
    <>
    <Provider>
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} style={styles.modalStyle} contentContainerStyle={styles.modalContentStyle}>
            <Text style={styles.modalText}>Delete "{deleteText}"?</Text>
            <View style={styles.buttonContainer}>
                <Button onPress={performDelete}  mode="contained" color={color.ui.error}>
                    Yes
                </Button>
                <Button onPress={hideModal} mode="outlined" color={color.ui.tertiary}>
                    No
                </Button>
            </View>
            </Modal>
      </Portal>
        <View style={styles.container}>
            <Text style={styles.bigText}>
                Todos Mobile 
                 <Text style={styles.smallText}> by j-code</Text>
            </Text>
           
        <FlatList 
                data={todoCtx.data}
                renderItem={(item)=>(
                <TodoSection 
                    key={item.id} 
                    title={item.item.title} 
                    date={item.item.date} 
                    onClick={()=>(navigateToTodos(item.item))} 
                    onLongClick={()=>longPressEvent(item.item.title,item.item.id)}
                    />
                    )}
                contentContainerStyle = {styles.listSpacingStyle}
                keyExtractor ={(item)=>item.id}
                style={styles.list}
            />
       </View>
       <PlusButton onPress={()=>{navigation.navigate("createEvent")}} /> 
       </Provider>
    </> 
       
        
     );
}
 
export default HomeScreen;

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
    modalContentStyle:{
        backgroundColor: color.bg.lightDark,
        padding: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        minHeight: 200,
        justifyContent:'space-around'

    },
    modalStyle:{
        justifyContent: 'flex-end'
    },
    modalText:{
        fontSize:17,
        textAlign:"center",
        textTransform:"capitalize",
        color:color.ui.quaternary,
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
})
import { TouchableOpacity, View,Text, StyleSheet } from "react-native";
import { color } from "../../utils/colors";
const TodoSection = ({onClick,onLongClick,title="loading",date="date"}) => {
    return ( 
    <TouchableOpacity onLongPress={onLongClick} onPress={onClick}>
        <View style={styles.box}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.dateText}>{date}</Text>
        </View>
    </TouchableOpacity> );
}
 
export default TodoSection;

const styles = StyleSheet.create({
    box:{
        paddingVertical: 20,
        paddingHorizontal: 15,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor: color.bg.dark,
        marginBottom:10
    },
    titleText:{
        color:color.text.inverse,
        fontSize: 16,
    },
    dateText:{
        color:color.text.disabled,
        fontSize: 14
    }
})
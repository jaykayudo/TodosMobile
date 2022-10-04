import { createContext, useContext, useState, useEffect, } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const TodosContext = createContext({
    data:[],
    addSection: (title,date)=>{},
    deleteSection:(id)=>{},
    finishTodos:(parentId,id)=>{},
    removeTodos:(parentId,id)=>{},
    addTodos:(parentId,todos)=>{}
})


export const TodosContextProvider = ({children})=>{
    const [data,setData] = useState([{id:"ffdvrtvr56t876vfdgbytryu",title:"First Todos",date: new Date().toDateString('en-GB'),expired:false,todos:[{title:"Play Game",finished:false,id:"disydisyd79ds7dd"}]}])
    const addSection =(title,date)=>{
        const id = makeid(7)
        const dateString = date.toDateString()
        const expired = false
        const todos = []
        const smallData = {id:id,title:title,date:dateString,expired,todos}
        setData((prevState)=>{
            return [...prevState,smallData]
        })
    }
    const deleteSection = (id)=>{
        setData((prevState)=>{
            return prevState.filter((value)=>value.id !== id)
        })
    }
    const finishTodos = (parentId,Id)=>{
        setData((previousState)=>{
            const prevState = [...previousState]
            const foundIndex = prevState.findIndex((value)=>value.id == parentId)
            const foundState = prevState[foundIndex]
            foundState.todos[foundState.todos.findIndex((value)=> value.id== Id)].finished = true
            prevState[foundIndex] = foundState
            return prevState
        })
    }
    const removeTodos = (parentId,Id)=>{
        setData((previousState)=>{
            const prevState = [...previousState]
            const foundIndex = prevState.findIndex((value)=>value.id == parentId)
            const foundState = prevState[foundIndex]
            delete foundState.todos[foundState.todos.findIndex((value)=> value.id== Id)]
            prevState[foundIndex] = foundState
            return prevState
        })
    }
    const addTodos = (parentId, todos)=>{
        const id = makeid(7)
        setData((previousState)=>{
            const prevState = [...previousState]
            prevState[prevState.findIndex((value)=>value.id == parentId)].todos.push({id: id,title:todos,finished:false})
            return prevState
        })
    }
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    const uploadTodos = async()=>{
        try{
            const todosDatas = await AsyncStorage.getItem("todosData")
            if(todosDatas){
                setData(JSON.parse(todosDatas))
            }else{
                setData([])
            }
        }catch(e){
            setData([])
            Alert.alert(
                'Load Error',
                "There was an error in loading the todos data",
                {
                    text:"Cancel"
                }
              )
        }
        
    }
    const updateTodos = async()=>{
        try{
            const todosDatas = await AsyncStorage.setItem("todosData",JSON.stringify(data))
        }catch(e){
            Alert.alert(
                'Save Error',
                "There was an error in saving the todos data",
                {
                    text:"Cancel"
                }
              )
        }
        
    }
    const checkedExpired = ()=>{
        const today  = new Date()
        setData((prevState)=>{ 
            for(let x = 0; x < prevState.length; x++ ){
                if(today > new Date(prevState[x].date)){
                    prevState[x].expired = true
                }
            }
            return prevState
        })
    }
    useEffect(()=>{
        uploadTodos()
        checkedExpired()
    },[])
    useEffect(()=>{
        updateTodos()
    },[data])
    return(
        <TodosContext.Provider
        value={
            {
                data,
                addSection,
                deleteSection,
                finishTodos,
                removeTodos,
                addTodos
            }
        }
        >
            {children}
        </TodosContext.Provider>
    )
}
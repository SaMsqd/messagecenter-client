import { useEffect, useState } from "react";
import { Message } from './ComponentMessage';
import { FaPlus } from "react-icons/fa6";
import { LuPlus } from "react-icons/lu";
import { GoPaperAirplane } from "react-icons/go";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios";

export const MessageBlock = ({id, chatId, chatName, product, onClickColor, onClickBack,settingAcc, messages, token, acc_avito_name, test}) => {

    const [listMessage, setListMessage] = useState([])
    const [wsMessages, setWsMessage] = useState([])

    const url = "185.41.160.212:8000"
    const renderMessage = () => {
        const list_mess = []
        for(const i in messages) {
            const dif_mess = messages[i]
            for(const j in dif_mess) {
                if (dif_mess[j].content && dif_mess[j].content.text) {
                    if (!dif_mess[j].content.text.startsWith("[Системное сообщение]")) {
                        const date = new Date(dif_mess[j].created * 1000); // Умножаем на 1000, так как timestamp обычно указывает на количество секунд, а не миллисекунд
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        const n_date = `${hours}:${minutes}`
                        list_mess.push({
                            id: dif_mess[j].id,
                            put:  dif_mess[j].direction,
                            text:  dif_mess[j].content.text,
                            check:  dif_mess[j].isRead,
                            time:  n_date
                        })
                        setListMessage(list_mess)
                        setWsMessage([])
                    } 
                }   
            }
        }
    }
    const headers_auth = {
        headers: {
            'accept': 'application/json',
            'Authorization': token,
            'Content-Type': 'application/json',
        }
    }



    useEffect(() => {    
        setListMessage([])       
        setWsMessage([])
        renderMessage() 
        
        if (test && test.payload.value.chat_id === chatId) {
            const data_ws_mess = test.payload.value
            const datews = new Date(data_ws_mess.created * 1000); 
            const hoursws = datews.getHours();
            const minutesws = datews.getMinutes();
            const n_datews = `${hoursws}:${minutesws}`

            const wsmess = {      
                id: data_ws_mess.id,
                put:  test.payload.direction,
                text:  data_ws_mess.content.text,
                check: false,
                time:  n_datews,
            }   
            setListMessage(list => [wsmess, ...list])
            console.log("+++")
        }

    }, [messages, test]);

    const [messageText, setMessageText] = useState('')

    const inputMessage = (e) => {
        setMessageText(e.target.value);
    };

    const sendMessage = () => {
        axios.post(`http://${url}/avito_chats/send_message?chat_id=${id}&account_name=${acc_avito_name}&message=${messageText}`, {
            chat_id: id,
            account_name: acc_avito_name,
            message: messageText
        }, headers_auth
        )
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            setMessageText('')
        })

    }

    const handleColorClick = (color, id, user_name, onClickColor) => {
        onClickColor(color, id, user_name);
    }

    const handleBackClick = (onClickBack) => {
        // Вызываем функцию, которая передается через props в компонент MessageBlock
        // и передаем цвет и id
        onClickBack(null);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault()
          sendMessage()
        } else if (event.key === 'Enter' && event.shiftKey) {
          setMessageText((prevMessage) => prevMessage + '\n')

        }
    }

    // // console.log("##>", test.payload.value.content.text)
    return(

       <div className="MessageBlock">
               
               <div className="TopPanel">
                   <div className="Back">
                   <IoArrowBackOutline size={32} onClick={() => {
                            handleBackClick(onClickBack)
                        }} 
                    />
                   </div>
                   <div className="MessageChatInfo">
                       <div className="ChatName">
                           {chatName}
                       </div>
                       <div className="ChatNameProduct">
                           {product}
                       </div>
                   </div>

                   <div className="tabs">
                   <div className="elips" id="blue" >
                        {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer" onClick={() => handleColorClick("blue", id, chatName, onClickColor)} /> : ""}
                    </div>
                       <div className="elips" id="yellow" >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("yellow", id, chatName, onClickColor)} /> : ""}
                       </div>
                       <div className="elips" id="gray" >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("gray", id, chatName, onClickColor)} /> : ""}
                       </div>
                       <div className="elips" id="green" >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("green", id, chatName, onClickColor)} /> : ""}
                       </div>
                       <div className="elips" id="red"  >
                            {!settingAcc ? <LuPlus color="#fff" size={20} className="pointer"  onClick={() => handleColorClick("red", id, chatName, onClickColor)}/> : ""}
                       </div>
                   </div>

               </div>

           <div className="Messages">

                    {    
                        listMessage.map(itemdata => 
                            (    
                                <Message 
                                    key={itemdata.id}
                                    put={itemdata.put}
                                    text={itemdata.text}
                                    check={itemdata.check}
                                    time={itemdata.time}
                                />
                            ))
                    }
           </div> 

           <div className="InputMessageBlock">

               <FaPlus color="#000" size={32} className="pointer __pl"/>
               <textarea className="InputMessage" placeholder="Сообщение"
                       value={messageText}
                       onChange={inputMessage}
                       onKeyPress={handleKeyPress}
               />
               <GoPaperAirplane className="IconSend pointer __pr" 
                   size={32}
                   onClick={sendMessage}
               />

           </div>

       </div>

        
    )

} 
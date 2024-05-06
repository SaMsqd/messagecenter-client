import { NavLink } from "react-router-dom"
// import { Socket } from "socket.io-client"
// import { io } from "socket.io-client"
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useLocation } from 'react-router-dom';
import { IoCheckmarkDoneOutline } from "react-icons/io5";

import { Chat } from "../../components/ComponentChat";
import './chats.css'
export const Chats = () => {
    let location = useLocation();
    const token = location.state.token
    console.log('\x1b[33m%s\x1b[0m', "token: ", token, "\n \n \n")
    const acc_list = [
        {
            id: 1,
            name: "АБ",
        },
        {
            id: 2,
            name: "ВГ"
        },
        {
            id: 3,
            name: "ДЕ"
        }
    ]
    
    const chat_list = [
        {
            id: 1,
            color: "red",
            user_name: "Николай Убунта",
            product: "Ядро UniLix",
            last_message: "Я у вас приобрел 124 'копий херувимы-2' ",
            checked: false,
            date: "24.12.2012",
            amount_message: 21,
        },
        {
            id: 2,
            color: "green",
            user_name: "Семен Никулин",
            product: "Система МАС ОС",
            last_message: "Много ли тех кто бхает мас для игр?' ",
            checked: true,
            date: "21.12.2012",
            amount_message: 1,
        },

    ]

    console.log('\x1b[33m%s\x1b[0m',  "\naccs: \n",  acc_list)
    console.log('\x1b[33m%s\x1b[0m',  "\nchats: \n", chat_list)


    const renderAcc = () => {
        
        return acc_list.map(acc => (
            <div key={acc.id} className="Account" data-index={acc.id}>{acc.name}</div>
        ));
    }

    const renderChat = () => {
        return chat_list.map(chat => (
            <Chat 
            key={chat.id}
                id={chat.id}
                color={chat.color} 
                userName={chat.user_name} 
                product={chat.product}
                lastMessage={chat.last_message}
                checkedInfo={chat.checked}
                dateText={chat.date}
                amountMessage={chat.amount_message}
            />
        ))
    }
   

    return(

        <div className="wrapper">
            
            <div className="MainSideBar">
                <div className="OptionsPanel">
                    <div className="ColorFolders">

                        <div className="circle" id="blue"/>
                        <div className="circle" id="yellow"/>
                        <div className="circle" id="gray"/>
                        <div className="circle" id="green"/>
                        <div className="circle" id="red"/>

                    </div>

                    <div className="Accounts">
                        <div className="AccountsList">
                            <div className="List">

                                <div className="dotBlock" onClick={() => {console.log("tap")}}>
                                    <PiDotsThreeOutlineLight className="dot"  size={32} />  
                                </div>
                                
                                {
                                    renderAcc()
                                }

                            </div>
   
                        </div>
                    </div>
                </div>



                <div className="ChatsBlock">


                    <div className="SearchBlock">

                        <div className="InputBlock">

                            <div className="IconSearch" >
                                <CiSearch size={40} />
                            </div>
                            <input className="Input" placeholder="Поиск ...">

                            </input>

                        </div>
                        <GoPaperAirplane className="IconSend" size={32}/>
                        <PiDotsThreeOutlineLight className="Dots" size={32} />  



                    </div>



                    <div className="scrollbox">

                        <div className="scrollbox-inner">
                            {
                                renderChat()
                            }
                        </div>

                    </div>

                   
                </div>


            </div>

            <div className="MessageBlock">
                <div className="MessageChatBlock">
                    <div className="TopPanel">
                            {/*  */}
                    </div>
                    <div className="Messages">
                        
                    </div>
                    <div className="InputMessage"></div>
                </div>
            </div>

        </div>

    )
}
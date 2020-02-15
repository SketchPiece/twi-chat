import React,{useState,useEffect, useContext} from 'react'
import Message from './Message'
import { UserContext } from '../../context/UserContext';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {ToBottom} from '../../scripts/extra'

export default function Messages({setVisibleButton,messages}) {
    const [loading
        // ,setLoading
    ] = useState(false);
    const [isBottom, setIsBottom] = useState(true)

    let user = useContext(UserContext)

    useEffect(() => {
        ToBottom()
        // setVisibleButton(false)
    }, [])

    useEffect(() => {
        // let lastMsg = messages.pop()
        if(messages.length!==0){
            // console.log(messages[messages.length-1])
            if(messages[messages.length-1].username === user.username) ToBottom()
            // console.log(isBottom)
            if(isBottom) ToBottom()
        }
        // let msgs = messages
        // console.log(msgs.pop())
        // setVisibleButton(false)
        // const thread = document.getElementById("msgs")
        // const scrollMax = thread.scrollHeight-thread.offsetHeight
        // const scroll = thread.scrollTop;
        // console.log(scrollMax,scroll)
    }, [messages,isBottom,user])
    

    // useEffect(() => {
    //     effect
        
    // })
    
    function scrollHandler() {
        const thread = document.getElementById("msgs")
        const scrollMax = thread.scrollHeight-thread.offsetHeight
        // setScroll(thread.scrollTop);
        const scroll = thread.scrollTop;
        // console.log(scrollMax-scrollMax*0.10,thread.scrollTop)
        // console.log(scrollMax-scrollMax*0.10<scroll)
        if(scrollMax-scrollMax*0.10<scroll){
            // console.log('set false')
            setVisibleButton(false)
            setIsBottom(true)
        }else{
            // console.log("set true")
            setVisibleButton(true)
            setIsBottom(false)

        }
    }
    

    return (

        <div className="thread-container" id="msgs" onScroll={scrollHandler}>
            { loading ? (
                <div className="loading">
                    Loading...
                </div>
            ) : (
				<div className="thread" id="msgsInner">
                    <ReactCSSTransitionGroup
                        transitionName={{
                            enter: "animated",
                            enterActive: "zoomIn",
                            leave: "animated",
                            
                            // leaveActive: "fadeOutRight"
                        }}
                        // transitionAppearTimeout={1000}
                        // transitionEnter={1000}
                        // transitionLeaveTimeout={1000}
                        >
                    {
                        messages.map((msg, index)=>{               
                            // console.log(user.userId===msg.userId)            
                            return <Message className="fast" key={index} message={msg.text} me={user.userId === msg.userId ? true : false} name={msg.username} img={"/images/default.png"} />
                        })
                    }
                    </ReactCSSTransitionGroup>
                    
                    {/* <Message message={'Привет всем!'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Чем занимаетесь?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    
                    <Message message={'Ничем особо, страдаем херней дружно'} me={false} name={"MasterTime"} img={"/images/default.png"} />
                    <Message message={'Присоединяйся к нам)'} me={false} name={"MasterTime"} img={"/images/default.png"} />

                    <Message message={'Объект возбуждает изобарический сверхпроводник как при нагреве, так и при охлаждении. В условиях электромагнитных помех, неизбежных при полевых измерениях, не всегда можно опредлить, когда именно течение среды неупруго. Исследователями из разных лабораторий неоднократно наблюдалось, как волна синфазно синхронизует плоскополяризованный вихрь. Галактика, в рамках ограничений классической механики, масштабирует расширяющийся электрон независимо от расстояния до горизонта событий.'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />

                    <Message message={'Панладовая система, в первом приближении, свободна. Open-air, в первом приближении, синхронно варьирует сонорный хамбакер. Фузз иллюстрирует флажолет, однако сами песни забываются очень быстро. Процессуальное изменение волнообразно. Канал, согласно традиционным представлениям, неравномерен.'} me={false} name={"MasterTime"} img={"/images/default.png"} /> */}

				</div>
                )
            }

			</div>
    )
}

import React,{useState,useEffect, useContext} from 'react'
import Message from './Message'
import { UserContext } from '../../context/UserContext';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default function Messages({setVisibleButton,messages}) {
    const [loading
        // ,setLoading
    ] = useState(false);

    let user = useContext(UserContext)

    useEffect(() => {
        // console.log('scroll')
        let container = document.getElementById('msgs');
        container.scrollTo(0, container.scrollHeight-container.offsetHeight);
        // console.log('set false')
        setVisibleButton(false)
        // console.log();
    }, [setVisibleButton])
    
    // useEffect(()=>{
    //     console.log(messages)
    // },[messages])

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
        }else{
            // console.log("set true")
            setVisibleButton(true) 
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
                            return <Message className="fast" key={index} message={msg.text} me={user.userId === msg.userId ? true : false} name={msg.username} img={"https://cdn.discordapp.com/avatars/578197813821833227/ca27c52873bb1c3ee33aca4fbc0a09bf.png?size=256"} />
                        })
                    }
                    </ReactCSSTransitionGroup>
                    
                    {/* <Message message={'Привет всем!'} me={true} name={"Sketch"} img={"https://cdn.discordapp.com/avatars/331103366774259713/98a1aff5ac590c1840571f504955bc12.png?size=256"} />
                    <Message message={'Чем занимаетесь?'} me={true} name={"Sketch"} img={"https://cdn.discordapp.com/avatars/331103366774259713/98a1aff5ac590c1840571f504955bc12.png?size=256"} />
                    
                    <Message message={'Ничем особо, страдаем херней дружно'} me={false} name={"MasterTime"} img={"https://cdn.discordapp.com/avatars/296717915921711104/1283e05dbeee00217565ae3cd7224fde.png?size=256"} />
                    <Message message={'Присоединяйся к нам)'} me={false} name={"MasterTime"} img={"https://cdn.discordapp.com/avatars/296717915921711104/1283e05dbeee00217565ae3cd7224fde.png?size=256"} />

                    <Message message={'Объект возбуждает изобарический сверхпроводник как при нагреве, так и при охлаждении. В условиях электромагнитных помех, неизбежных при полевых измерениях, не всегда можно опредлить, когда именно течение среды неупруго. Исследователями из разных лабораторий неоднократно наблюдалось, как волна синфазно синхронизует плоскополяризованный вихрь. Галактика, в рамках ограничений классической механики, масштабирует расширяющийся электрон независимо от расстояния до горизонта событий.'} me={true} name={"Sketch"} img={"https://cdn.discordapp.com/avatars/331103366774259713/98a1aff5ac590c1840571f504955bc12.png?size=256"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"https://cdn.discordapp.com/avatars/331103366774259713/98a1aff5ac590c1840571f504955bc12.png?size=256"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"https://cdn.discordapp.com/avatars/331103366774259713/98a1aff5ac590c1840571f504955bc12.png?size=256"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"https://cdn.discordapp.com/avatars/331103366774259713/98a1aff5ac590c1840571f504955bc12.png?size=256"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"https://cdn.discordapp.com/avatars/331103366774259713/98a1aff5ac590c1840571f504955bc12.png?size=256"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"https://cdn.discordapp.com/avatars/331103366774259713/98a1aff5ac590c1840571f504955bc12.png?size=256"} />

                    <Message message={'Панладовая система, в первом приближении, свободна. Open-air, в первом приближении, синхронно варьирует сонорный хамбакер. Фузз иллюстрирует флажолет, однако сами песни забываются очень быстро. Процессуальное изменение волнообразно. Канал, согласно традиционным представлениям, неравномерен.'} me={false} name={"MasterTime"} img={"https://cdn.discordapp.com/avatars/296717915921711104/1283e05dbeee00217565ae3cd7224fde.png?size=256"} /> */}

				</div>
                )
            }

			</div>
    )
}

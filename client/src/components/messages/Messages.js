import React,{useState,useEffect} from 'react'
import Message from './Message'

export default function Messages({setVisibleButton}) {
    const [loading
        // ,setLoading
    ] = useState(false);

    useEffect(() => {
        // console.log('scroll')
        let container = document.getElementById('msgs');
        container.scrollTo(0, container.scrollHeight-container.offsetHeight);
        console.log('set false')
        setVisibleButton(false)
        // console.log();
    }, [setVisibleButton])
    
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
                    
                    <Message message={'Привет всем!'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Чем занимаетесь?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    
                    <Message message={'Ничем особо, страдаем херней дружно'} me={false} name={"MasterTime"} img={"/images/default.png"} />
                    <Message message={'Присоединяйся к нам)'} me={false} name={"MasterTime"} img={"/images/default.png"} />

                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />
                    <Message message={'Согласны?Узнали?'} me={true} name={"Sketch"} img={"/images/default.png"} />

				</div>
                )
            }

			</div>
    )
}

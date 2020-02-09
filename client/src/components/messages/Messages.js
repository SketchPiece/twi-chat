import React,{useState,useEffect} from 'react'
import Message from './Message'

export default function Messages() {
    const [loading
        // ,setLoading
    ] = useState(false);
    useEffect(() => {
        let container = document.getElementById('msgs');
        container.scrollTo(0, container.scrollHeight);
        console.log();
      }, [])
    return (

        <div className="thread-container" id="msgs">
            { loading ? (
                <div className="loading">
                    Loading...
                </div>
            ) : (
				<div className="thread">
                    
                    <Message message={'Привет всем!'} right={true} name={"Отправитель"} />
                    <Message message={'Чем занимаетесь?'} right={true} name={"Отправитель"} />
                    
                    <Message message={'Ничем особо, страдаем херней дружно'} right={false} name={"MasterTime"} />
                    <Message message={'Присоединяйся к нам)'} right={false} name={"MasterTime"} />
                    
                    <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    {/* <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    <Message message={'Флуд'} right={true} name={"Отправитель"} />
                    <Message message={'Флуд'} right={true} name={"Отправитель"} /> */}



				</div>
                )
            }

			</div>
    )
}

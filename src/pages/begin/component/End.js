import { Image } from 'antd';
import fish from '../../../assets/fish.gif'

const End = () => {
    return (
        <>
            <h3>设置完成</h3>
            <div>
                <Image
                    width={200}
                    src={fish}
                />
            </div>
        </>
    )
}

export default End
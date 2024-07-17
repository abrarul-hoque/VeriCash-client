import { Link, useRouteError } from 'react-router-dom';
import Lottie from 'react-lottie';
import notFimg from '../../../assets/notFound.json';
import errImg from '../../../assets/errorImg.gif';
import { Helmet } from 'react-helmet';
import Header from '../../shared/Header/Header';
import Footer from '../../shared/Footer/Footer';

const NotFound = () => {
    const error = useRouteError();

    const avater = {
        loop: true,
        autoplay: true,
        animationData: notFimg,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    console.log(error)

    return (
        <div className=''>
            <Header></Header>
            <Helmet>
                <meta charSet="utf-8" />
                <title>VeriCash | Page Not Found</title>
            </Helmet>
            <div className='text-center'>

                <div className='flex justify-center my-8'>

                    {error.status === 404 ? <Lottie
                        options={avater}
                        height={300}
                        width={450}
                    /> : <img className='max-w-96 w-auto ' src={errImg} alt="" />}
                    {/* {error.status === 404 && <img className='max-w-96 w-auto ' src={notFound} alt="" />} */}
                </div>
                <h1 className='text-4xl my-4 text-[#2847FF] font-bold'>{error.statusText}</h1>
                <p>{error.data}</p>
                <p>{error.message}</p>
                <Link to="/" className='btn btn-success my-6'>Go to Home</Link>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default NotFound;
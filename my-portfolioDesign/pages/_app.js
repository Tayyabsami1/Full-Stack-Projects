import '../styles/globals.css';
import Layout from '../components/Layout';
import Trasition from '../components/Transition';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout>
      <AnimatePresence mode='wait'>
        <motion.div key={router.route} >
          <Trasition/>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}

export default MyApp;

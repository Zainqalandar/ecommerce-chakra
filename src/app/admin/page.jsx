'use client';
import AdminRoot from "@/components/admin";
import {Button} from "@chakra-ui/react";


const AdminPage = () => {

    const handleSubmit = async (e)  => {
        // e.preventDefault();
        console.log('handleSubmit');
        try {
            const res = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'zain qalandar',
                    price: 13.5,
                    description: 'lorem ipsum set, This is shopify weibsite which use for varias.',
                    image: 'https://www.digitalsilk.com/wp-content/uploads/2023/08/how-to-start-a-shopify-store-hero-image2.png',
                    category: 'electronic'
                })
            });

        }catch (err){
            console.log('Api failed err',err);
        }
    }

    return (
        <>
            <Button onClick={handleSubmit}>Sumbite post</Button>
            <AdminRoot />
        </>
    )
}

export default AdminPage
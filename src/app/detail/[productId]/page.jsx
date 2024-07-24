'use client';
import ProductDetail from '@/components/product-detail';
import Loading from '@/components/ui/Loading';
import useFetch from '@/hooks/useFetch';
import { useNotification } from '@/provider/context/NotificationProvider';
import { useEffect } from 'react';

const Detail = (props) => {
	const notify = useNotification();
	const {
		data: product,
		loading,
		error,
	} = useFetch(`products/${props.params.productId}`);

	if (loading) return <Loading />;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<>
			<ProductDetail product={product} />
		</>
	);
};

export default Detail;

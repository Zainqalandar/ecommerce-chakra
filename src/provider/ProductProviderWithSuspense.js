import React, { Suspense } from 'react';
import ProductProvider from "@/provider/context/ProductProvider";

const ProductProviderWithSuspense = ({ children }) => {
    return (
        <Suspense fallback={<div>Loading products...</div>}>
            <ProductProvider>{children}</ProductProvider>
        </Suspense>
    );
};

export default ProductProviderWithSuspense;

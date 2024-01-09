import { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { usePutSearchProductHistoryMutation } from '@/api/hooks/useAPIProducts';
import { ModalAddProductCartDeclaration } from '@/components/autonomous/ModalAddProductCartDeclaration';
import { ModalCategoryProduct } from '@/components/autonomous/ModalCategoryProduct';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { OnAddProductOptions } from '@/components/business/FormSelectProduct';
import { NomenclatureCard } from '@/components/business/NomenclatureCard';
import { Typography } from '@/components/common/Typography';
import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import { Meta } from '@/layout/Meta';
import { Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';
import { SearchType } from '@/utils/search';

const SearchProduct = () => {
  const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);
  const { trackEvent } = useMatomo();
  const { addProductCartDeclarationAgent, searchProducts, findProduct, defaultCurrency } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      addProductCartDeclarationAgent: state.addProductCartDeclarationAgent,
      searchProducts: state.searchProducts,
      defaultCurrency: state.declaration.appState.declarationAgentRequest.defaultCurrency,
    }),
    shallow,
  );

  const updateSearchProductHistory = usePutSearchProductHistoryMutation({});

  const router = useRouter();

  const { id, search, selectedId }: { id?: string; search?: string; selectedId?: string } =
    router.query;

  const productsThatMatch: Product[] = [];

  if (id) {
    productsThatMatch.push(findProduct(id as string) as Product);
  } else {
    searchProducts((search as string) ?? '').map((product) => productsThatMatch.push(product));
  }
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedId) {
      return;
    }

    const initialProduct = findProduct(selectedId);
    if (!initialProduct) {
      return;
    }

    setSelectedProduct(initialProduct);
    setOpenCategoryDownModal(true);
  }, [selectedId]);

  const onAddProduct = ({ product, value, currency, name }: OnAddProductOptions) => {
    const shoppingProduct: ShoppingProduct = {
      id: uuidv4(),
      productId: product.id,
      name,
      value: parseFloat(value),
      amount: 1,
      currency: currency ?? 'EUR',
    };

    addProductCartDeclarationAgent(shoppingProduct);
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });
    setOpenModalAddProduct(false);
    router.push(`/agent/declaration/ajout/marchandises`);
  };

  const onClickProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenCategoryDownModal(true);
    updateSearchProductHistory.mutate({ productId: product.id, searchValue: search });
  };

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withTitle
        titleHeader="Recherche"
      >
        <div className="flex flex-1 flex-col border-t border-secondary-300 py-4 mx-5">
          <div className="">
            <Typography size="text-sm" color="black">
              {`${(productsThatMatch as Product[])?.length} résultat${
                (productsThatMatch as SearchType<Product>[])?.length > 1 ? 's' : ''
              } pour "${id ? productsThatMatch[0]?.name : search ?? ''}"`}
            </Typography>
          </div>
          <div className="flex flex-1 flex-col gap-4 mt-2">
            {(productsThatMatch as SearchType<Product>[])?.map((product) => (
              <NomenclatureCard
                key={product.id}
                product={product}
                onClick={onClickProduct}
                searchValue={search as string}
              />
            ))}
          </div>
        </div>
        <ModalCategoryProduct
          open={openCategoryDownModal}
          onClose={() => setOpenCategoryDownModal(false)}
          defaultCurrency={defaultCurrency}
          defaultProduct={selectedProduct}
        />
        <ModalAddProductCartDeclaration
          open={openModalAddProduct}
          onClose={() => setOpenModalAddProduct(false)}
          onAddProduct={onAddProduct}
          currentProduct={selectedProduct}
          defaultCurrency={defaultCurrency}
        />
      </MainAgent>
    </AgentRoute>
  );
};
export default declarationAgent(SearchProduct);

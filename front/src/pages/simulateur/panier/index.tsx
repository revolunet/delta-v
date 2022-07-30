import { useRef, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { ModalMaximumAmount } from '@/components/autonomous/ModalMaximumAmount';
import { OnActionModal } from '@/components/autonomous/OnActionModal';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { ProductBasket } from '@/components/common/ProductBasket';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import {
  getAmountCategoryName,
  getAmountProductType,
  getMessageOverMaximumAmount,
  getUnit,
} from '@/model/amount';
import { AmountProduct } from '@/model/product';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const Panier = () => {
  const router = useRouter();

  const {
    country,
    valueProducts: detailedProducts,
    amountProducts,
    removeProduct,
  } = useStore(
    (state) => ({
      country: state.simulator.appState.simulatorRequest.country,
      valueProducts: state.simulator.appState.simulatorResponse?.valueProducts ?? [],
      amountProducts: state.simulator.appState.simulatorResponse?.amountProducts ?? [],
      removeProduct: state.removeProduct,
    }),
    shallow,
  );
  const [openActionModal, setOpenActionModal] = useState(false);
  const idToDelete = useRef('');

  const onDelete = (): void => {
    removeProduct(idToDelete.current);
    setOpenActionModal(false);
  };

  const [productType, setProductType] = useState<
    'alcohol' | 'tobacco' | 'valueProduct' | undefined
  >();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const openModalProductType = (amountProduct?: AmountProduct) => {
    setProductType(amountProduct ? getAmountProductType(amountProduct) : 'valueProduct');

    setTimeout(() => {
      setOpenModal(true);
    }, 150);
  };

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withCart
      withTitle
      titleValue="Mes achats"
      titleIcon="calculator"
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-3">
          {detailedProducts.map((detailedProduct) => (
            <div key={detailedProduct.customId}>
              <ProductBasket
                dataBasket={{ unit: '€', value: detailedProduct.unitPrice, ...detailedProduct }}
                detailedProduct={detailedProduct}
                onDeleteProduct={() => {
                  idToDelete.current = detailedProduct.customId;
                  setOpenActionModal(true);
                }}
                onUpdateProduct={() => {
                  router.push(`/simulateur/panier/modifier/${detailedProduct.customId}`);
                }}
              />
            </div>
          ))}

          {amountProducts.map((amountProduct) => (
            <div key={amountProduct.group} className="flex flex-col gap-3">
              <div className="mt-2">
                <Typography color="light-gray">
                  {getAmountCategoryName(amountProduct.group)}
                </Typography>
              </div>
              {amountProduct.products.map((product) => (
                <ProductBasket
                  containError={amountProduct.isOverMaximum}
                  dataBasket={{
                    unit: getUnit(product.amountProduct) ?? '',
                    value: product.amount,
                    ...product,
                  }}
                  onDeleteProduct={() => {
                    idToDelete.current = product.customId;
                    setOpenActionModal(true);
                  }}
                  onUpdateProduct={() => {
                    router.push(`/simulateur/panier/modifier/${product.customId}`);
                  }}
                />
              ))}
              {amountProduct.isOverMaximum && (
                <div className="flex flex-row gap-1 text-red-700">
                  <div className="h-4 w-4">
                    <Icon name="error" />
                  </div>
                  <p className="flex-1 text-xs">
                    Vous dépassez la limite légale d'unités{' '}
                    {getMessageOverMaximumAmount(amountProduct.group)}. Pour connaître les quantités
                    maximales autorisées{' '}
                    <span
                      className="text-link"
                      onClick={() => {
                        openModalProductType(amountProduct.products[0]?.amountProduct);
                      }}
                    >
                      cliquez ici
                    </span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3">
          <Link to="/simulateur/produits">
            <div className="flex flex-row items-center justify-center rounded-[10px] bg-primary-100 py-3.5 px-8">
              <div className="mr-3 mt-[2px] h-6 w-6 text-primary-600">
                <SvgIcon name="add" />
              </div>
              <Typography color="primary" size="text-lg">
                Ajouter un nouvel achat
              </Typography>
            </div>
          </Link>
        </div>
        <div className="mb-8 flex-1" />
        <Link to="/simulateur/recapitulatif">
          <Button fullWidth size="xl">
            Valider ma simulation
          </Button>
        </Link>
      </div>
      <OnActionModal
        open={openActionModal}
        onSuccess={onDelete}
        onReject={() => setOpenActionModal(false)}
      />
      {(productType === 'alcohol' || productType === 'tobacco') && (
        <ModalMaximumAmount
          open={openModal}
          onClose={() => setOpenModal(false)}
          productType={productType}
          country={country}
        />
      )}
    </Main>
  );
};
export default simulator(Panier);

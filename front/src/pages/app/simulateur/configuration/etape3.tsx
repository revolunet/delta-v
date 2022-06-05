import { useEffect, useMemo } from 'react';

import { Alpha2Code, getNames } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';
import { useStore } from '@/stores/store';
import { ConfigurationSteps } from '@/templates/ConfigurationSteps';

export interface FormSimulatorData {
  country?: Alpha2Code;
}

const Configuration = () => {
  const resetSteps = useStore((state) => state.resetSteps);
  const validateStep3 = useStore((state) => state.validateStep3);
  const meanOfTransport = useStore((state) => state.simulator.appState.meanOfTransport);
  const router = useRouter();
  const numberStep = 3;
  useEffect(() => {
    resetSteps(numberStep);
  }, [numberStep]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormSimulatorData>({
    defaultValues: {
      country: undefined,
    },
  });

  const onSubmit = (data: FormSimulatorData) => {
    if (!data.country) {
      return;
    }
    validateStep3(data.country);

    if (meanOfTransport === 'car' && data.country === 'CH') {
      router.push(`/app/simulateur/configuration/etape4`);
    }
    router.push(`/app/simulateur/produits`);
  };

  const countriesOptions = useMemo(() => {
    const countries = getNames('fr', { select: 'official' });
    const keys = Object.keys(countries);
    return keys.map((key) => ({ value: countries[key] ?? '', id: key }));
  }, []);

  return (
    <ConfigurationSteps progression={75}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          label="Quel est le pays d’où vous arrivez ?"
          type="comboboxes"
          fullWidth={true}
          name="country"
          options={countriesOptions}
          register={register('country', { required: true })}
          control={control}
          error={errors?.country?.message}
        />
        <div className="absolute inset-x-0 bottom-0 w-full">
          <div className="p-4">
            {errors?.country && <div className="text-red-500">{errors.country.message}</div>}
            <Button fullWidth={true} type="submit">
              Valider
            </Button>
          </div>
        </div>
      </form>
    </ConfigurationSteps>
  );
};

export default Configuration;

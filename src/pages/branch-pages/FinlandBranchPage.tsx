import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function FinlandBranchPage() {
  const config = countryConfig.finland;
  return (
    <BranchPageTemplateV2
      countryKey="finland"
      countryName="Finland"
      countryFlag={countryFlags.finland}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Finland', config.registrationAuthority)}
      price={config.price}
    />
  );
}


import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function BulgariaBranchPage() {
  const config = countryConfig.bulgaria;
  return (
    <BranchPageTemplateV2
      countryKey="bulgaria"
      countryName="Bulgaria"
      countryFlag={countryFlags.bulgaria}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Bulgaria', config.registrationAuthority)}
      price={config.price}
    />
  );
}


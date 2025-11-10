import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function MaltaBranchPage() {
  const config = countryConfig.malta;
  return (
    <BranchPageTemplateV2
      countryKey="malta"
      countryName="Malta"
      countryFlag={countryFlags.malta}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Malta', config.registrationAuthority)}
      price={config.price}
    />
  );
}


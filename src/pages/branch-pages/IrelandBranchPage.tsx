import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function IrelandBranchPage() {
  const config = countryConfig.ireland;
  return (
    <BranchPageTemplateV2
      countryKey="ireland"
      countryName="Ireland"
      countryFlag={countryFlags.ireland}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Ireland', config.registrationAuthority)}
      price={config.price}
    />
  );
}


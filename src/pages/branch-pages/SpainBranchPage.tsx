import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function SpainBranchPage() {
  const config = countryConfig.spain;
  return (
    <BranchPageTemplateV2
      countryKey="spain"
      countryName="Spain"
      countryFlag={countryFlags.spain}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Spain', config.registrationAuthority)}
      price={config.price}
    />
  );
}


import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function PolandBranchPage() {
  const config = countryConfig.poland;
  return (
    <BranchPageTemplateV2
      countryKey="poland"
      countryName="Poland"
      countryFlag={countryFlags.poland}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Poland', config.registrationAuthority)}
      price={config.price}
    />
  );
}


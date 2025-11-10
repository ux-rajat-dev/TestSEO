import React from 'react';
import { BranchPageTemplateV2 } from '../BranchPageTemplateV2';
import { getServiceDetails, countryFlags } from './serviceDetailsHelper';
import { countryConfig } from './countryConfig';

export function PortugalBranchPage() {
  const config = countryConfig.portugal;
  return (
    <BranchPageTemplateV2
      countryKey="portugal"
      countryName="Portugal"
      countryFlag={countryFlags.portugal}
      registrationFee={config.registrationFee}
      processingTime={config.processingTime}
      notaryRequired={config.notaryRequired}
      heroDescription={config.heroDescription}
      serviceDetails={getServiceDetails('Portugal', config.registrationAuthority)}
      price={config.price}
    />
  );
}


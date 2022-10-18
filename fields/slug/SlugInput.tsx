// From @stupidism https://github.com/payloadcms/payload/discussions/584
// todo: improve logic to restart tracking after deviation (eg, both fields empty)

import { kebabCase } from 'lodash';
import { TextInput, useField, useWatchForm } from 'payload/components/forms';
import React, { useEffect, useRef } from 'react';

export const getSlugInput = ({ trackingField }: { trackingField: string }) => () => {
  const { getDataByPath } = useWatchForm();
  const { value: slugValue = '', setValue: setSlugValue } = useField<string>({ path: 'slug' });
  const trackingFieldValue = getDataByPath<string>(trackingField) || '';
  const prevTrackingFieldValueRef = useRef(trackingFieldValue);
  const stopTrackingRef = useRef(false);

  useEffect(() => {
    if (!trackingField || stopTrackingRef.current) {
      return;
    }
    if (trackingFieldValue === prevTrackingFieldValueRef.current) {
      return;
    }
    const prevSlugValue = kebabCase(prevTrackingFieldValueRef.current);
    prevTrackingFieldValueRef.current = trackingFieldValue;
    if (prevSlugValue !== slugValue) {
      return;
    }
    setSlugValue(kebabCase(trackingFieldValue));
  }, [trackingFieldValue]);

  return (
    <div>
      <TextInput
        name="slug"
        path="slug"
        label="Slug"
        description={slugValue ? `Auto generated based on ${trackingField}` : `Will be auto-generated from ${trackingField} on save`}
        value={slugValue}
        onChange={e => {
          setSlugValue(e.target.value);
          // Stop tracking if slug changes and is not equivalent to tracking field
          if (kebabCase(e.target.value) !== kebabCase(trackingFieldValue)) {
            stopTrackingRef.current = true;
          } else {
            stopTrackingRef.current = false;
          }
        }}
      />
    </div>
  );
}
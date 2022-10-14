import React, { useEffect, useState, useCallback, Fragment } from 'react'

// this is how we'll interface with Payload itself
import { useFieldType, useField, useWatchForm, TextInput } from 'payload/components/forms';

import { useDocumentInfo } from 'payload/components/utilities';

import slugify from 'slugify';

// we can use existing Payload types easily
import { Props } from 'payload/components/fields/Text';


const InputField: React.FC<Props> = (props) => {

  // Destructure props to useful variables
  const {
    path,
    label,
    required
  } = props;

  // If the item already exists in the colletion (updating) this will be set
  const { id } =  useDocumentInfo();

  const { getDataByPath } = useWatchForm();
  const { value, setValue } = useField({ path });
  
  const target: string = getDataByPath('name');
  
  useEffect(() => {
     // do not update the slug once it has been created by checking that `id` exists
    // if you wanted to dangerously update the slug (potentially breaking links), you could add an updateSlug checkbox field for more control 
    console.log(this);
    if(!id) {
        const slug = slugify(target ?? "", {lower: true, strict: true});
        setValue(slug);
      }
    }, [target, setValue]);


  
    return (
      <div>
        <span>
          <TextInput
            path={path}
            name={path}
            value={`${value}`}
            label={label}
          />
        </span>
      </div>
    );
  };
export default InputField;

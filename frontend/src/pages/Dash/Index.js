import React, {useEffect} from 'react';
import {CheckAuth} from '../../utils';

function Index() {

  useEffect(() => {
    CheckAuth();
  }, [])

  return (
    <div>
      dashbaord page
    </div>
  )
}

export default Index

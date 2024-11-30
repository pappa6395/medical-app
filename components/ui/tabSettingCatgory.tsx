import React from 'react'
import { TabsContent } from './tabs';
import { TabsSettingCategoryProps } from '@/utils/types';



const tabsSettingCatgory = (props: TabsSettingCategoryProps) => {

  return (

    <div>
        <TabsContent value={props.value}>
            <div className="space-y-6 pb-4">
                <div>
                    <h3 className="text-lg font-medium">{props.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {props.description}
                    </p>
                </div>
            </div>
            {props.component}
        </TabsContent>
    </div>

  )
}

export default tabsSettingCatgory
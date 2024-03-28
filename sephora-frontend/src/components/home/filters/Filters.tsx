import * as React from 'react';
import Filter from './Filter';
import {IFilter} from './types';

const Filters: React.FC<{ filters: IFilter[] }>
    = ({filters}) => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div>
            {filters.map((filter, i) => (
                <Filter key={i}
                        expanded={expanded}
                        handleChange={handleChange}
                        filter={filter}/>
            ))}
        </div>
    );
}

export default Filters;

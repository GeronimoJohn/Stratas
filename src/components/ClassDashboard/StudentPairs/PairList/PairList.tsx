import React, { ReactElement } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import DeleteIcon from '@mui/icons-material/Delete'
import { StudentPair } from '@/libs/classSorter'

interface PairListProps {
  pairs: StudentPair[]
  onRemovePair: (index: number) => void
}

export function PairList({ pairs, onRemovePair }: PairListProps): ReactElement {
  return (
    <>
      {pairs?.length > 0 && (
        <List>
          {pairs.map(({ pair: [student1, student2], type }, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onRemovePair(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${student1} - ${student2}`} />
              <Chip
                label={type === 'conflict' ? 'Conflict' : 'Pairing'}
                color={type === 'conflict' ? 'error' : 'success'}
                size="small"
                sx={{ ml: 2 }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}

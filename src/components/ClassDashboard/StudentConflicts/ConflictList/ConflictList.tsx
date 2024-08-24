import React, { ReactElement } from 'react'
import { List, ListItem, ListItemText, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { StudentPair } from '../StudentConflicts'

interface ConflictListProps {
  conflicts: StudentPair[]
  onRemoveConflict: (index: number) => void
}

export function ConflictList({
  conflicts,
  onRemoveConflict
}: ConflictListProps): ReactElement {
  return (
    <>
      {conflicts?.length > 0 && (
        <List>
          {conflicts.map(([student1, student2], index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onRemoveConflict(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${student1} - ${student2}`} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}

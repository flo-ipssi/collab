import { Typography } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'

interface FormSectionHeaderProps {
  icon: SvgIconComponent;
  title: string;
}

export default function FormSectionHeader({ icon: Icon, title }: FormSectionHeaderProps) {
  return (
    <Typography
      variant="h5"
      component="h2"
      className="text-2xl font-bold text-center mb-6 flex items-center justify-center"
    >
      <Icon className="mr-2" />
      {title}
    </Typography>
  )
}

import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'

const drawerWidth = 240

const navItems = [
	{ label: 'Upload', path: '/' },
	{ label: 'EDA', path: '/eda' },
	{ label: 'RFM', path: '/rfm' },
	{ label: 'Segments', path: '/segments' },
	{ label: 'Churn', path: '/churn' },
	{ label: 'Basket', path: '/basket' },
	{ label: 'Forecast', path: '/forecast' },
]

export const Layout: React.FC<{ children: React.ReactNode, onNavigate: (path: string) => void, currentPath: string }>
	= ({ children, onNavigate, currentPath }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const handleDrawerToggle = () => setMobileOpen((prev) => !prev)

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.path} disablePadding>
						<ListItemButton selected={currentPath === item.path} onClick={() => { onNavigate(item.path); setMobileOpen(false) }}>
							<ListItemText primary={item.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	)

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Retail Analytics
					</Typography>
				</Toolbar>
			</AppBar>
			<Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
				<Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
					ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
					{drawer}
				</Drawer>
				<Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
					{drawer}
				</Drawer>
			</Box>
			<Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	)
}
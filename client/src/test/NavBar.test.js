/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'

// stub the logo import
jest.mock('../assets/nicologo.png', () => 'mocked-logo.png')

test('NavBar renders all links with correct hrefs and shows the logo', () => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  )

  const expectedHrefs = {
    Home:      '/',
    About:     '/about',
    Projects:  '/projects',
    Education: '/education',
    Services:  '/services',
    Contact:   '/contact',
    'Sign In': '/signin',
  }

  Object.entries(expectedHrefs).forEach(([label, href]) => {
    const link = screen.getByRole('link', { name: label })
    expect(link).toHaveAttribute('href', href)
  })

  const logo = screen.getByAltText('logo')
  expect(logo).toHaveAttribute('src', 'mocked-logo.png')
})

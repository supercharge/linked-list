'use strict'

const { test } = require('uvu')
const expect = require('expect')
const { LinkedList } = require('../dist')

test('from', () => {
  expect(LinkedList.from().toArray()).toEqual([])
  expect(LinkedList.from([]).toArray()).toEqual([])

  expect(LinkedList.from(1, 1, 2, 3).toArray()).toEqual([1, 1, 2, 3])
})

test('push', () => {
  expect(LinkedList.from().push(1).toArray()).toEqual([1])
  expect(LinkedList.from([]).push(1).toArray()).toEqual([1])

  expect(LinkedList.from([1]).push(2).toArray()).toEqual([1, 2])
})

test.run()

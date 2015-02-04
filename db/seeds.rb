# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#
# 51.768621,-3.763869
# -29.526589,28.410845
# 45.546411,17.705924
# 35.182554,133.565128
# -23.586389,-46.501664
# 49.277202,1.767776
# 42.306777,-88.41649
# 46.747496,7.534306
# 60.108252,6.222783
# 17.698694,101.52332

p1 = Panorama.create(lat: 51.768621, lng: -3.763869, heading: 0, pitch: 0)
p2 = Panorama.create(lat: -29.526589, lng: 28.410845, heading: -112, pitch: -8)
p3 = Panorama.create(lat: 45.546411, lng: 17.705924, heading: 0, pitch: 0)
p4 = Panorama.create(lat: 35.182554, lng: 133.565128, heading: 0, pitch: 0)
p5 = Panorama.create(lat: -23.586389, lng: -46.501664, heading: 186, pitch: -19)
p6 = Panorama.create(lat: 49.277202, lng: 1.767776, heading: 0, pitch: 0)
p7 = Panorama.create(lat: 42.306777, lng: -88.41649, heading: 0, pitch: 0)
p8 = Panorama.create(lat: 46.747496, lng: 7.534306, heading: 0, pitch: 0)
p9 = Panorama.create(lat: 60.108252, lng: 6.222783, heading: 0, pitch: 0)
p10 = Panorama.create(lat: 17.698694, lng: 101.52332, heading: 0, pitch: 0)
